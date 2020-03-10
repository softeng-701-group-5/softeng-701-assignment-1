package com.feeder.server.providers.reddit;
import com.feeder.server.ApplicationProperties;
import net.dean.jraw.RedditClient;
import net.dean.jraw.http.NetworkAdapter;
import net.dean.jraw.models.Listing;
import net.dean.jraw.models.Submission;
import net.dean.jraw.models.SubredditSort;
import net.dean.jraw.oauth.Credentials;
import net.dean.jraw.pagination.DefaultPaginator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;


import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
public class RedditFeedProviderTest {

    @Autowired private RedditClient mockRedditClient;
    @Autowired @InjectMocks
    private RedditFeedProvider subject;
    private ApplicationProperties mockProperties = new ApplicationProperties("test","test","test","test");

    @Test
    public void testGetFeed() {
        // arrange
        int expectedNumberOfListings = 2;
        DefaultPaginator<Submission> mockPaginator = mock(DefaultPaginator.class);
        List<Listing<Submission>> mockList = Arrays.asList(new Listing[expectedNumberOfListings]);
        DefaultPaginator.Builder<Submission, SubredditSort> builder = mock(DefaultPaginator.Builder.class);

        when(mockRedditClient.frontPage()).thenReturn(builder);
        when(builder.limit(anyInt())).thenReturn(builder);
        when(builder.build()).thenReturn(mockPaginator);
        when(mockPaginator.accumulate(anyInt())).thenReturn(mockList);

//        subject = new TestableRedditFeedProvider(mockProperties);

        // act
        List<Listing<Submission>> result = subject.getFeed(expectedNumberOfListings);

        // assert
        assertEquals(result.size(), expectedNumberOfListings);
    }

//    @Test
//    public void testPropertyValidation() {
//        try {
////            subject = new TestableRedditFeedProvider(new ApplicationProperties("","","",""));
////            fail();
//        } catch (IllegalStateException e) {
//
//        }
//    }

}