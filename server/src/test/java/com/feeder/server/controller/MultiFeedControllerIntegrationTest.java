package com.feeder.server.controller;

import com.feeder.server.model.*;
import com.feeder.server.provider.FeedProvider;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.reactive.server.WebTestClient;

@WebFluxTest(controllers = MultiFeedController.class)
public class MultiFeedControllerIntegrationTest {

  @Autowired WebTestClient webTestClient;

  // For now we mock all dependencies since they are not implemented
  @MockBean FeedProvider<RedditData> mockRedditFeedProvider;
  @MockBean FeedProvider<HackerNewsData> mockHackerNewsFeedProvider;
  @MockBean FeedProvider<GithubData> mockGithubFeedProvider;
  @MockBean FeedProvider<TwitterData> mockTwitterFeedProvider;
  @MockBean FeedProvider<WeatherData> mockWeatherFeedProvider;

  @Test
  public void testSerializationDemoFlow() {
    webTestClient
        .get()
        .uri("/demo")
        .exchange()
        .expectStatus()
        .isOk()
        .expectBodyList(DemoData.class)
        .contains(DemoData.newBuilder().title("Cat").imageURI("http://cat.jpg").build())
        .hasSize(1);
  }
}
