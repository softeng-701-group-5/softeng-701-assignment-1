package com.feeder.server.provider.twitter;

import com.feeder.server.model.TwitterData;
import com.feeder.server.provider.FeedProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;
import twitter4j.*;

@Service
public class TwitterFeedProvider implements FeedProvider<TwitterData> {

  @Autowired private Twitter twitter;

  private ResponseList<Status> lastResponse;

  @Override
  public Flux<TwitterData> getFeed() {
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
              for (MediaEntity m : status.getMediaEntities()) {
                String url = m.getMediaURLHttps();
                if (url != null)
                  return TwitterData.newBuilder()
                      .tweet(status.getText())
                      .profileUsername(status.getUser().getName())
                      .profileImageURI(status.getUser().get400x400ProfileImageURL())
                      .tweetPostDate(status.getCreatedAt())
                      .tweetMediaURL(url)
                      .build();
              }
              return TwitterData.newBuilder()
                  .tweet(status.getText())
                  .profileUsername(status.getUser().getName())
                  .profileImageURI(status.getUser().get400x400ProfileImageURL())
                  .tweetPostDate(status.getCreatedAt())
                  .build();
            });
  }
}
