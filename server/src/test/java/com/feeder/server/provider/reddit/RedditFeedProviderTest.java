package com.feeder.server.provider.reddit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import net.dean.jraw.RedditClient;
import net.dean.jraw.models.Listing;
import net.dean.jraw.models.Submission;
import net.dean.jraw.models.SubredditSort;
import net.dean.jraw.pagination.DefaultPaginator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@WebFluxTest(controllers = RedditFeedProvider.class)
@ExtendWith(MockitoExtension.class)
public class RedditFeedProviderTest {

  @MockBean private RedditClient mockRedditClient;

  @Autowired private RedditFeedProvider subject;

  @Test
  public void testGetFeed() {
    // arrange
    int expectedNumberOfListings = 2;
    DefaultPaginator<Submission> mockPaginator = mock(DefaultPaginator.class);
    List<Listing<Submission>> mockList = Arrays.asList(new Listing[expectedNumberOfListings]);
    DefaultPaginator.Builder<Submission, SubredditSort> builder =
        mock(DefaultPaginator.Builder.class);

    when(mockRedditClient.frontPage()).thenReturn(builder);
    when(builder.limit(anyInt())).thenReturn(builder);
    when(builder.build()).thenReturn(mockPaginator);
    when(mockPaginator.accumulate(anyInt())).thenReturn(mockList);

    // act
    List<Listing<Submission>> result = subject.getFeed(expectedNumberOfListings);

    // assert
    assertEquals(result.size(), expectedNumberOfListings);
  }
}
