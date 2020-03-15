package com.feeder.server.provider.hackernews;

import com.feeder.server.model.DemoData;
import com.feeder.server.model.HackerNewsData;
import com.feeder.server.provider.FeedProvider;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

@Service
public class HackerNewsFeedProvider implements FeedProvider<HackerNewsData> {
  @Override
  public Flux<HackerNewsData> getFeed() {
    WebClient client = WebClient.create();
    Flux<HackerNewsData> feed = client.get()
            .uri("https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty")
            .retrieve()
            .bodyToFlux(Integer.class)
            .flatMap(id -> client.get()
                    .uri("https://hacker-news.firebaseio.com/v0/item/" + id + ".json")
                    .retrieve()
                    .bodyToFlux(HackerNewsData.class)
                    .map(data -> HackerNewsData.newBuilder()
                            .title(data.title().get())
                            .by(data.by().get())
                            .time(data.time().get())
                            .url(data.url().orElse("https://news.ycombinator.com/ask/" + id.toString()))
                            .text(data.text().orElse(""))
                            .score(data.score().get())
                            .build()));

    System.out.println(feed.count());

    return feed;
  }
}