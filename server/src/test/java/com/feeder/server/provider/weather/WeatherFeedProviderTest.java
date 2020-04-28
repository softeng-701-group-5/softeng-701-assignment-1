package com.feeder.server.provider.weather;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.feeder.server.ApplicationProperties;
import com.feeder.server.model.WeatherData;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

@WebFluxTest(controllers = WeatherDataProvider.class)
@ExtendWith(MockitoExtension.class)
public class WeatherFeedProviderTest {

  @MockBean private WebClient mockWebClient;
  @Autowired private WeatherDataProvider subject;
  @Mock private WeatherData mockData;
  @MockBean private ApplicationProperties applicationProperties;

  @BeforeEach
  public void setUp() {
    subject.setClient(mockWebClient);
  }

  @Test
  public void testGetFeed() {
    // arrange
    int expectedFeedSize = 1;

    WebClient.RequestHeadersUriSpec mockRequestHeadersUriSpec =
        mock(WebClient.RequestHeadersUriSpec.class);
    WebClient.RequestHeadersSpec mockRequestHeaderSpec = mock(WebClient.RequestHeadersSpec.class);
    WebClient.ResponseSpec mockResponseSpec = mock(WebClient.ResponseSpec.class);

    when(mockWebClient.get()).thenReturn(mockRequestHeadersUriSpec);
    when(mockRequestHeadersUriSpec.uri(
            "https://api.openweathermap.org/data/2.5/weather?q=auckland&units=metric&appid="
                + applicationProperties.getWeatherApiKey()))
        .thenReturn(mockRequestHeaderSpec);
    when(mockRequestHeaderSpec.retrieve()).thenReturn(mockResponseSpec);
    when(mockResponseSpec.bodyToFlux(WeatherData.class)).thenReturn(Flux.just(mockData));

    // act
    Flux<WeatherData> result = subject.getFeed();
    // assert
    assertEquals(expectedFeedSize, result.collectList().block().size());
  }
}
