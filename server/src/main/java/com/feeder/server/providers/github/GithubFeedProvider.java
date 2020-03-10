package com.feeder.server.providers.github;

import com.feeder.server.models.GithubData;
import com.feeder.server.providers.FeedProvider;
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
