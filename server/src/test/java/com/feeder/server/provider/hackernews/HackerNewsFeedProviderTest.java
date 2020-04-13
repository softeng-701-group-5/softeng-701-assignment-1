package com.feeder.server.provider.hackernews;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.feeder.server.model.data.HackerNewsData;
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

@WebFluxTest(controllers = HackerNewsFeedProvider.class)
@ExtendWith(MockitoExtension.class)
public class HackerNewsFeedProviderTest {

  @MockBean private WebClient mockWebClient;
  @Autowired private HackerNewsFeedProvider subject;
  @Mock private HackerNewsData mockData;

  @BeforeEach
  public void setUp() {
    subject.setClient(mockWebClient);
  }

  @Test
  public void testGetFeed() {
    // arrange
    int expectedFeedSize = 5;

    WebClient.RequestHeadersUriSpec mockRequestHeadersUriSpec =
        mock(WebClient.RequestHeadersUriSpec.class);
    WebClient.RequestHeadersSpec mockRequestHeaderSpec = mock(WebClient.RequestHeadersSpec.class);
    WebClient.ResponseSpec mockResponseSpec = mock(WebClient.ResponseSpec.class);

    when(mockWebClient.get()).thenReturn(mockRequestHeadersUriSpec);
    when(mockRequestHeadersUriSpec.uri(
            "https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty"))
        .thenReturn(mockRequestHeaderSpec);
    when(mockRequestHeaderSpec.retrieve()).thenReturn(mockResponseSpec);
    when(mockResponseSpec.bodyToFlux(Integer.class)).thenReturn(Flux.range(0, expectedFeedSize));
    // Each of the URI method calls needs to be mocked.
    for (int i = 0; i < expectedFeedSize; i++) {
      when(mockRequestHeadersUriSpec.uri(
              "https://hacker-news.firebaseio.com/v0/item/" + i + ".json"))
          .thenReturn(mockRequestHeaderSpec);
    }
    when(mockResponseSpec.bodyToFlux(HackerNewsData.class)).thenReturn(Flux.just(mockData));

    // act
    Flux<HackerNewsData> result = subject.getFeed();
    // assert
    assertEquals(expectedFeedSize, result.collectList().block().size());
  }
}
