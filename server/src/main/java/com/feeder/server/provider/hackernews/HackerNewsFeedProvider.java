package com.feeder.server.provider.hackernews;

import com.feeder.server.model.HackerNewsData;
import com.feeder.server.provider.FeedProvider;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class HackerNewsFeedProvider implements FeedProvider<HackerNewsData> {
    @Override
    public Flux<HackerNewsData> getFeed() {
        // TODO: spotify team to implement
        return Flux.empty();
    }
}