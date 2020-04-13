package com.feeder.server.provider.twitter;

import com.feeder.server.model.TwitterData;
import com.feeder.server.provider.FeedProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;
import twitter4j.MediaEntity;
import twitter4j.ResponseList;
import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterException;

/**
 * A TwitterFeedProvider is responsible for retrieving Tweets posts from a user's Twitter feed using
 * the Twitter API.
 */
@Service
public class TwitterFeedProvider implements FeedProvider<TwitterData> {

  @Autowired private Twitter twitter;

  private ResponseList<Status> lastResponse;

  @Override
  public Flux<TwitterData> getFeed() {
    // Gets the twitter posts from the user's home feed
    return Mono.fromCallable(() -> twitter.getHomeTimeline())
        .subscribeOn(Schedulers.elastic())
        .doOnSuccess(
            statuses -> {
              // Cache the statuses
              if (statuses != null) {
                lastResponse = statuses;
              }
            })
        .onErrorResume(
            // Fallback to cached response when rate limited
            TwitterException.class, e -> Mono.justOrEmpty(lastResponse))
        .flatMapMany(Flux::fromIterable)
        .map(
            status -> {
              // If the tweet has a media elements (e.g. photos), add the
              // media to the data builder
              TwitterData.Builder twitterBuilder = TwitterData.newBuilder();
              for (MediaEntity m : status.getMediaEntities()) {
                String url = m.getMediaURLHttps();
                if (url != null) twitterBuilder.tweetMediaURL(url);
              }
              return twitterBuilder
                  .tweet(status.getText())
                  .profileUsername(status.getUser().getName())
                  .profileImageURI(status.getUser().get400x400ProfileImageURL())
                  .tweetPostDate(status.getCreatedAt())
                  .build();
            });
  }

  ResponseList<Status> getLastResponse() {
    return lastResponse;
  }
}
