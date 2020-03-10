package com.feeder.server.providers.reddit;

import net.dean.jraw.RedditClient;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

@Profile("test")
@Configuration
@ExtendWith(MockitoExtension.class)
public class MockRedditClientConfig {

    @Mock
    private RedditClient mockRedditClient;

    @Bean(name="mockRedditClient")
    @Primary
    public RedditClient getClient() {
        return mockRedditClient;
    }

}
