package com.feeder.server.provider.twitter;

import com.feeder.server.ApplicationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import twitter4j.Twitter;
import twitter4j.TwitterFactory;
import twitter4j.conf.ConfigurationBuilder;

/**
 * This class is package-private to limit the use of the credential class outside the scope of the twitter package
 */
@Configuration
class TwitterCredentials {
    private TwitterFactory twitterFactory;
    TwitterCredentials(ApplicationProperties properties) {
        ConfigurationBuilder cb = new ConfigurationBuilder();
        cb.setDebugEnabled(true)
                .setOAuthConsumerKey(properties.getTwitterConsumerKey())
                .setOAuthConsumerSecret(properties.getTwitterConsumerSecret())
                .setOAuthAccessToken(properties.getTwitterAccessToken())
                .setOAuthAccessTokenSecret(properties.getTwitterAccessTokenSecret());
        twitterFactory = new TwitterFactory(cb.build());
    }

    @Bean
    public Twitter getTwitterInstance(ApplicationProperties properties) {
        return twitterFactory.getInstance();
    }
}
