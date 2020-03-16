package com.feeder.server.provider.hackernews;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import com.feeder.server.model.HackerNewsData;
import com.feeder.server.model.RedditData;
import java.time.Instant;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import net.dean.jraw.RedditClient;
import net.dean.jraw.models.Listing;
import net.dean.jraw.models.Submission;
import net.dean.jraw.models.SubredditSort;
import net.dean.jraw.pagination.DefaultPaginator;
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
        int expectedFeedSize = 1;

        WebClient.RequestHeadersUriSpec mockRequestHeadersUriSpec = mock(WebClient.RequestHeadersUriSpec.class);
        WebClient.RequestHeadersSpec mockRequestHeaderSpec = mock(WebClient.RequestHeadersSpec.class);
        WebClient.ResponseSpec mockResponseSpec = mock(WebClient.ResponseSpec.class);

        when(mockWebClient.get()).thenReturn(mockRequestHeadersUriSpec);
        when(mockRequestHeadersUriSpec.uri("https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty"))
                .thenReturn(mockRequestHeaderSpec);
        when(mockRequestHeaderSpec.retrieve()).thenReturn(mockResponseSpec);
        when(mockResponseSpec.bodyToFlux(Integer.class)).thenReturn(Flux.range(expectedFeedSize - 1,expectedFeedSize));
        when(mockRequestHeadersUriSpec.uri("https://hacker-news.firebaseio.com/v0/item/" + (expectedFeedSize - 1) + ".json"))
                .thenReturn(mockRequestHeaderSpec);
        when(mockResponseSpec.bodyToFlux(HackerNewsData.class)).thenReturn(Flux.just(mockData));

        // act
        Flux<HackerNewsData> result = subject.getFeed();
        // assert
        assertEquals(1, result.collectList().block().size());
    }
}
