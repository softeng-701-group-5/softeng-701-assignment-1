package com.feeder.server.provider.weather;

import com.feeder.server.ApplicationProperties;
import com.feeder.server.model.WeatherData;
import com.feeder.server.provider.FeedProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

@Service
public class WeatherDataProvider implements FeedProvider<WeatherData> {

  private WebClient client = WebClient.create();
  @Autowired ApplicationProperties applicationProperties;

  @Override
  public Flux<WeatherData> getFeed() {
    // Gets all "Ask Weather" posts. Build a WeatherData type for each forecast retrieved
    return client
        .get()
        .uri(
            "https://api.openweathermap.org/data/2.5/weather?q=auckland&units=metric&appid="
                + applicationProperties.getWeatherApiKey())
        .retrieve()
        .bodyToFlux(WeatherData.class);
  }
  /** For testing only. */
  void setClient(WebClient client) {
    this.client = client;
  }
}
