package com.feeder.server.provider.twitter;

import com.feeder.server.model.TwitterData;
import com.feeder.server.provider.FeedProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import java.util.ArrayList;
import java.util.List;

@Service
public class TwitterFeedProvider implements FeedProvider<TwitterData> {

  @Autowired private Twitter twitter;

  @Override
  public Flux<TwitterData> getFeed() {
    List<Status> statuses;
    List<TwitterData> modelledResponse = new ArrayList<>();

    try {
      statuses = twitter.getHomeTimeline();

      for (Status status : statuses) {
        modelledResponse.add(
                TwitterData.newBuilder()
                .tweet(status.getText())
                .profileUsername(status.getUser().getName())
                .profileImageURI(status.getUser().get400x400ProfileImageURL())
                .tweetPostDate(status.getCreatedAt())
                .build()
        );
      }
      return Flux.just(modelledResponse).flatMapSequential(Flux::fromIterable);
    } catch (TwitterException e) {
      e.printStackTrace();
      return Flux.error(new RuntimeException("An error occurred retrieving Tweets"));
    }
  }
}
