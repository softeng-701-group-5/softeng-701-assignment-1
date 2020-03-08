package com.feeder.server.providers.reddit;
import com.feeder.server.ApplicationProperties;
import net.dean.jraw.RedditClient;
import net.dean.jraw.http.NetworkAdapter;
import net.dean.jraw.models.Submission;
import net.dean.jraw.oauth.Credentials;
import net.dean.jraw.pagination.DefaultPaginator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;


import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class RedditFeedProviderTest {

    @Mock private RedditClient mockRedditClient;
    private TestableRedditFeedProvider subject;
    private ApplicationProperties mockProperties = new ApplicationProperties("test","test","test","test");

    @Test
    public void testGetFeed() {
        // arrange
        int expectedNumberOfSubmissions = 2;
        DefaultPaginator mockPaginator = mock(DefaultPaginator.class);
        List mockList = Arrays.asList(new Submission[expectedNumberOfSubmissions]);
        DefaultPaginator.Builder builder = mock(DefaultPaginator.Builder.class);

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
    public void testPropertyValidation() {
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