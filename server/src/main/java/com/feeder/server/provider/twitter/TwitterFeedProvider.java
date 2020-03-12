package com.feeder.server.provider.twitter;

import com.feeder.server.model.TwitterData;
import com.feeder.server.provider.FeedProvider;
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
