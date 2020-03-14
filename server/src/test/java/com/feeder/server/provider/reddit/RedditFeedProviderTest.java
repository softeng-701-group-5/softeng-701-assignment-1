package com.feeder.server.provider.reddit;

import com.feeder.server.model.RedditData;
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
import reactor.core.publisher.Flux;

import java.time.Instant;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@WebFluxTest(controllers = RedditFeedProvider.class)
@ExtendWith(MockitoExtension.class)
public class RedditFeedProviderTest {

  @MockBean private RedditClient mockRedditClient;
  @Mock private Submission mockSubmission;
  @Autowired private RedditFeedProvider subject;

  @BeforeEach
  public void setUp() {
    when(mockSubmission.getTitle()).thenReturn("test");
    when(mockSubmission.getAuthor()).thenReturn("test");
    when(mockSubmission.getCreated()).thenReturn(Date.from(Instant.EPOCH));
    when(mockSubmission.getSubreddit()).thenReturn("test");
    when(mockSubmission.getUrl()).thenReturn("test");
    when(mockSubmission.getThumbnail()).thenReturn("test");
    when(mockSubmission.getSelfText()).thenReturn("test");
  }

  @Test
  public void testGetFeed() {
    // arrange
    int expectedNumberOfSubmissions = 1;
    DefaultPaginator<Submission> mockPaginator = mock(DefaultPaginator.class);
    DefaultPaginator.Builder<Submission, SubredditSort> builder =
        mock(DefaultPaginator.Builder.class);

    Iterator<Listing<Submission>> mockIterator = spy(Iterator.class);
    Submission[] submissionsArray = new Submission[] {mockSubmission};
    List<Submission> submissions = Arrays.asList(submissionsArray);
    Listing<Submission> mockListings = Listing.create("nextName", submissions);

    when(mockRedditClient.frontPage()).thenReturn(builder);
    when(builder.build()).thenReturn(mockPaginator);
    when(mockPaginator.iterator()).thenReturn(mockIterator);
    when(mockIterator.next()).thenReturn(mockListings);

    // act
    Flux<RedditData> result = subject.getFeed();

    // assert
    assertEquals(expectedNumberOfSubmissions, result.collectList().block().size());
  }
}
