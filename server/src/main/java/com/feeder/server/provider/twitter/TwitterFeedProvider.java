package com.feeder.server.provider.twitter;

import com.feeder.server.model.TwitterData;
import com.feeder.server.provider.FeedProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;
import twitter4j.ResponseList;
import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterException;

@Service
public class TwitterFeedProvider implements FeedProvider<TwitterData> {

  Logger logger = LoggerFactory.getLogger(TwitterFeedProvider.class);
  @Autowired private Twitter twitter;
  private ResponseList<Status> lastResponse;

  @Override
  public Flux<TwitterData> getFeed() {

    long start = System.nanoTime();

    try {
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
              TwitterException.class,
              e -> {
                logger.info(e.getMessage());
                if (lastResponse != null) {
                  return Mono.just(lastResponse);
                }
                return Mono.empty();
              })
          .flatMapMany(Flux::fromIterable)
          .map(
              status ->
                  TwitterData.newBuilder()
                      .tweet(status.getText())
                      .profileUsername(status.getUser().getName())
                      .profileImageURI(status.getUser().get400x400ProfileImageURL())
                      .tweetPostDate(status.getCreatedAt())
                      .build());
    } finally{
      long stop = System.nanoTime();
      logger.info("Time taken: " + (stop - start) + "ns");
    }
  }
}
