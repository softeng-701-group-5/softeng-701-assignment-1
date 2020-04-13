package com.feeder.server.provider;

import com.feeder.server.model.GenericData;
import reactor.core.publisher.Flux;

/**
 * A {@link FeedProvider} handles all the API interactions to deliver a {@link Flux<T>} of some
 * generic data type. The data type could represent posts or events from a social media website.
 *
 * @param <T> Data type to be serialized to JSON and consumed by client
 */
public interface FeedProvider<T extends GenericData> {

  /**
   * Defines the entry point for all feeds.
   *
   * @return {@link Flux<T>} Stream of posts
   */
  Flux<T> getFeed();
}
