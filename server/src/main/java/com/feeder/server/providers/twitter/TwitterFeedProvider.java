package com.feeder.server.providers.twitter;

import com.feeder.server.models.TwitterData;
import com.feeder.server.providers.FeedProvider;
import reactor.core.publisher.Flux;

public class TwitterFeedProvider implements FeedProvider<TwitterData> {
    @Override
    public Flux<TwitterData> getFeed() {
        throw new UnsupportedOperationException();
    }
}
