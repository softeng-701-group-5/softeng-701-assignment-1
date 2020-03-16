package com.feeder.server.provider.hackernews;

import com.feeder.server.model.HackerNewsData;
import com.feeder.server.provider.FeedProvider;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

@Service
public class HackerNewsFeedProvider implements FeedProvider<HackerNewsData> {

  private WebClient client = WebClient.create();

  @Override
  public Flux<HackerNewsData> getFeed() {
    return client
        .get()
        .uri("https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty")
        .retrieve()
        .bodyToFlux(Integer.class)
        .flatMap(
            id ->
                client
                    .get()
                    .uri("https://hacker-news.firebaseio.com/v0/item/" + id + ".json")
                    .retrieve()
                    .bodyToFlux(HackerNewsData.class));
  }

  public void setClient(WebClient client) {
    this.client = client;
  }
}
