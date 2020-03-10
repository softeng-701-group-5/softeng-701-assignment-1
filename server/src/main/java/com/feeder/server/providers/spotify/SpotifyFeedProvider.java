package com.feeder.server.providers.spotify;

import com.feeder.server.models.SpotifyData;
import com.feeder.server.providers.FeedProvider;
import reactor.core.publisher.Flux;

public class SpotifyFeedProvider implements FeedProvider<SpotifyData> {
    @Override
    public Flux<SpotifyData> getFeed() {
        throw new UnsupportedOperationException();
    }
}
