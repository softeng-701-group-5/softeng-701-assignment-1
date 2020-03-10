package com.feeder.server.controllers;

import com.feeder.server.models.Hello;
import com.feeder.server.providers.reddit.RedditFeedProvider;
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
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class HelloControllerTests {

    @InjectMocks
    private HelloController subject;

    @Mock
    private RedditFeedProvider redditFeedProvider;
    @Mock
    private Listing<Submission> mockListing;


//    @Test
//    public void testHello() {
//        // arrange
//        when(mockListing.toString()).thenReturn("test");
//        Listing[] listings = {mockListing};
//        when(redditFeedProvider.getFeed(anyInt())).thenReturn(Arrays.asList(listings));
//
//        // act
//        Hello response = subject.readHello();
//
//        // assert
//        assertEquals(response.getMessage(), "hello");
//    }

}
