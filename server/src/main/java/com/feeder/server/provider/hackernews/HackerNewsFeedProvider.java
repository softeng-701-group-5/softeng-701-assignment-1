package com.feeder.server.provider.hackernews;

import com.feeder.server.model.HackerNewsData;
import com.feeder.server.provider.FeedProvider;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

/**
 * A HackerNewsFeedProvider is responsible for retrieving Hacker News posts from the "Ask HN" page
 * using the HackerNews API
 */
@Service
public class HackerNewsFeedProvider implements FeedProvider<HackerNewsData> {

  private WebClient client = WebClient.create();

  @Override
  public Flux<HackerNewsData> getFeed() {
    // Gets all "Ask HN" posts. Build a HackerNewsData type for each post retrieved
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

  /** For testing only. */
  void setClient(WebClient client) {
    this.client = client;
  }
}
