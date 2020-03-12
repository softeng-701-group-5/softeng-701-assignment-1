package com.feeder.server.provider.github;

import com.feeder.server.model.GithubData;
import com.feeder.server.provider.FeedProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

@Service
public class GithubFeedProvider implements FeedProvider<GithubData> {
  

  @Autowired
  public GithubFeedProvider() {

  }

  @Override
  public Flux<GithubData> getFeed() {
    // TODO: Github team to implement

    return Flux.empty();
  }
}
