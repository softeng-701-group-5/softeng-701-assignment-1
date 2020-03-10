package com.feeder.server.providers.reddit;

import com.feeder.server.ApplicationProperties;
import net.dean.jraw.RedditClient;
import net.dean.jraw.http.NetworkAdapter;
import net.dean.jraw.oauth.Credentials;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import static org.junit.jupiter.api.Assertions.*;

class RedditFeedProviderFactoryTest {
    @Mock
    private RedditClient mockRedditClient;
    @Mock
    private ApplicationProperties applicationProperties;
    private TestableRedditFeedProviderFactory subject;


    @BeforeEach
    void setUp() {
        subject = new TestableRedditFeedProviderFactory();
    }

    @Test
    void testCreateProvider() {
        // act
        RedditFeedProvider redditFeedProvider = subject.createProvider(new ApplicationProperties("test","test","test","test"));

        // assert
        assertNotNull(redditFeedProvider);
    }

    @Test
    public void testPropertyValidation() {
        try {
            subject.createProvider(new ApplicationProperties("","","",""));
            fail();
        } catch (IllegalStateException e) {

        }
    }

    public class TestableRedditFeedProviderFactory extends RedditFeedProviderFactory {

        public TestableRedditFeedProviderFactory() {
            super();
        }

        @Override
        protected RedditClient getAuthenticatedClient(NetworkAdapter adapter, Credentials credentials) {
            return mockRedditClient;
        }
    }
}