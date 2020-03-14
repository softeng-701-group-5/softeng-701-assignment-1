package com.feeder.server.provider.twitter;

import twitter4j.Twitter;
import twitter4j.TwitterFactory;
import twitter4j.conf.ConfigurationBuilder;

class TwitterCredentials {
    private TwitterFactory twitterFactory;

    TwitterCredentials() {
        ConfigurationBuilder cb = new ConfigurationBuilder();
        cb.setDebugEnabled(true)
                .setOAuthConsumerKey("i5JGViH7RbNsAZjxP7wg")
                .setOAuthConsumerSecret("mJRyuz5mHO5uaV9SJiN50BjdGaaSrJoeoNhU0x1Hqk")
                .setOAuthAccessToken("2206162813-0UdlOHoueqz8xNKFb3DftaRlPsbg8sZ1Gzj4epf")
                .setOAuthAccessTokenSecret("BfcjLwkbxIndcIKKMf5FaYCkSdrruJzEJxbzJJgne5W0e");
        twitterFactory = new TwitterFactory(cb.build());
    }

    public Twitter getTwitterInstance() {
        if (twitterFactory != null) {
            return twitterFactory.getInstance();
        } else {
            new TwitterCredentials();
            return twitterFactory.getInstance();
        }
    }
}
