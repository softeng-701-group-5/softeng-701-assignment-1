package com.feeder.server.providers.github;

import com.feeder.server.models.GithubData;
import com.feeder.server.providers.FeedProvider;
import reactor.core.publisher.Flux;

public class GithubFeedProvider implements FeedProvider<GithubData> {

    @Override
    public Flux<GithubData> getFeed() {
        throw new UnsupportedOperationException();
    }
}
