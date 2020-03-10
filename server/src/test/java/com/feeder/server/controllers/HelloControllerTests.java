package com.feeder.server.controllers;

import com.feeder.server.ApplicationProperties;
import com.feeder.server.models.Hello;
import com.feeder.server.providers.reddit.RedditFeedProvider;
import com.feeder.server.providers.reddit.RedditFeedProviderFactory;
import net.dean.jraw.models.Listing;
import net.dean.jraw.models.Submission;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class HelloControllerTests {

    @Mock private RedditFeedProviderFactory redditFeedProviderFactory;
    @Mock private RedditFeedProvider mockRedditFeedProvider;
    @Mock private Listing<Submission> mockListing;

    @InjectMocks
    private HelloController subject;

    @Test
    public void testHello() {
        // arrange
        when(mockListing.toString()).thenReturn("test");
        Listing[] listings = {mockListing};
        when(mockRedditFeedProvider.getFeed(anyInt())).thenReturn(Arrays.asList(listings));
        when(redditFeedProviderFactory.createProvider(any())).thenReturn(mockRedditFeedProvider);

        // act
        Hello response = subject.readHello();

        // assert
        assertEquals(response.getMessage(), "hello");
    }
}
