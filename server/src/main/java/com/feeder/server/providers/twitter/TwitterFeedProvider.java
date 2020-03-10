package com.feeder.server.providers.twitter;

import com.feeder.server.models.TwitterData;
import com.feeder.server.providers.FeedProvider;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class TwitterFeedProvider implements FeedProvider<TwitterData> {
  @Override
  public Flux<TwitterData> getFeed() {
    // TODO: Twitter team to implement
    return Flux.empty();
  }
}
