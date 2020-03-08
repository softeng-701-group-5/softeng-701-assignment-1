package com.feeder.server.providers.reddit;

import com.feeder.server.ApplicationProperties;
import net.dean.jraw.RedditClient;
import net.dean.jraw.http.NetworkAdapter;
import net.dean.jraw.models.Submission;
import net.dean.jraw.models.SubredditSort;
import net.dean.jraw.oauth.Credentials;
import net.dean.jraw.pagination.DefaultPaginator;
import net.dean.jraw.pagination.Paginator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

class RedditFeedProviderTest {
    private TestableRedditFeedProvider subject;
    private RedditClient mockRedditClient;
    private ApplicationProperties mockProperties = new ApplicationProperties("test","test","test","test");

    @Test
    void testGetFeed() {
        // arrange
        int expectedNumberOfSubmissions = 2;
        mockRedditClient = mock(RedditClient.class);
        DefaultPaginator mockPaginator = mock(DefaultPaginator.class);
        List mockList = Arrays.asList(new Submission[expectedNumberOfSubmissions]);
        DefaultPaginator.Builder<Submission, SubredditSort> builder = mock(DefaultPaginator.Builder.class);

        when(mockRedditClient.frontPage()).thenReturn(builder);
        when(builder.limit(anyInt())).thenReturn(builder);
        when(builder.build()).thenReturn(mockPaginator);
        when(mockPaginator.accumulate(anyInt())).thenReturn(mockList);

        subject = new TestableRedditFeedProvider(mockProperties);

        // act
        List result = subject.getFeed(expectedNumberOfSubmissions);

        // assert
        assertEquals(result.size(), expectedNumberOfSubmissions);
    }

    @Test
    void testPropertyValidation() {
        try {
            subject = new TestableRedditFeedProvider(new ApplicationProperties("","","",""));
            fail();
        } catch (IllegalStateException e) {

        }
    }

    private class TestableRedditFeedProvider extends RedditFeedProvider {
        public TestableRedditFeedProvider(ApplicationProperties mockProperties) {
            super(mockProperties);
        }

        @Override
        protected RedditClient getAuthenticatedClient(NetworkAdapter adapter, Credentials credentials) {
            return mockRedditClient;
        }
    }
}