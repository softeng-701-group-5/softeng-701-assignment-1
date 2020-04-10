package com.feeder.server.provider.weather;

import com.feeder.server.model.WeatherData;
import com.feeder.server.provider.FeedProvider;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

@Service
public class WeatherDataProvider implements FeedProvider<WeatherData> {

  private WebClient client = WebClient.create();

  @Override
  public Flux<WeatherData> getFeed() {
    // Gets all "Ask Weather" posts. Build a WeatherData type for each forecast retrieved
    return client
        .get()
        .uri(
            "api.openweathermap.org/data/2.5/weather?q=auckland&appid=fed5f6b010d51f1e212951f886b8d87f")
        .retrieve()
        .bodyToFlux(WeatherData.class);
  }
  /** For testing only. */
  void setClient(WebClient client) {
    this.client = client;
  }
}
