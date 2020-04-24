package com.feeder.server.provider.twitter;

import com.feeder.server.model.TwitterData;
import com.feeder.server.provider.FeedProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
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

  private static final String TWITTER_API_BASE_URL = "https://api.twitter.com/1.1";
  @Autowired private Twitter twitter;

  private WebClient.Builder webClientBuilder;
  private ResponseList<Status> lastResponse;

  @Override
  public Flux<TwitterData> getFeed() {
    // The endpoint that feeder uses to get twitter posts
    // https://api.twitter.com/1.1/statuses/home_timeline
    //  (from http://twitter4j.org/javadoc/twitter4j/api/TimelinesResources.html#getHomeTimeline--)

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

    // NEW CHANGES
    //      WebClient webClient = getWebClientBuilder().build();
    //      return webClient
    //              .get()
    //              .uri(TWITTER_API_BASE_URL + "/statuses/home_timeline")
    //              .headers(headers -> headers.setBearerAuth(""))
    //              .exchange()
    //              .map(response ->{
    //                  TwitterData.Builder twitterBuilder = TwitterData.newBuilder();
    //                  return twitterBuilder
    //                      .tweet(response.)
    //                      .profileUsername(status.getUser().getName())
    //                      .profileImageURI(status.getUser().get400x400ProfileImageURL())
    //                      .tweetPostDate(status.getCreatedAt())
    //                      .build();
    //              });

    // tweet:text, profileUsername:user.name, profileimageuri:

  }

  //    private WebClient.Builder getWebClientBuilder() {
  //        if (this.webClientBuilder == null) {
  //            this.webClientBuilder =
  //                    WebClient.builder()
  //                            .baseUrl(TWITTER_API_BASE_URL)
  //                            .defaultHeader(HttpHeaders.AUTHORIZATION);
  //        }
  //        return this.webClientBuilder;
  //    }

  ResponseList<Status> getLastResponse() {
    return lastResponse;
  }
}
