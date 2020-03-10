package com.feeder.server.providers;

import com.feeder.server.models.GenericData;
import reactor.core.publisher.Flux;

public interface FeedProvider <T extends GenericData> {

    Flux<T> getFeed();


}
