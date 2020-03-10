package com.feeder.server.provider.github;

import com.feeder.server.model.GithubData;
import com.feeder.server.provider.FeedProvider;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class GithubFeedProvider implements FeedProvider<GithubData> {

  @Override
  public Flux<GithubData> getFeed() {
    // TODO: Github team to implement
    return Flux.empty();
  }
}
