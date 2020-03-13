package com.feeder.server.provider.spotify;

import com.feeder.server.model.SpotifyData;
import com.feeder.server.provider.FeedProvider;
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
