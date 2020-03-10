package com.feeder.server.providers.spotify;

import com.feeder.server.models.SpotifyData;
import com.feeder.server.providers.FeedProvider;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class SpotifyFeedProvider implements FeedProvider<SpotifyData> {
  @Override
  public Flux<SpotifyData> getFeed() {
    // TODO: spotify team to implement
    return Flux.empty();
  }
}
