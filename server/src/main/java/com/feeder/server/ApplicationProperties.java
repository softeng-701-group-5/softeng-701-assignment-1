package com.feeder.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ApplicationProperties {

  private String redditUsername;
  private String redditPassword;
  private String redditClientId;
  private String redditClientSecret;

  private String twitterConsumerKey;
  private String twitterConsumerSecret;
  private String twitterAccessToken;
  private String twitterAccessTokenSecret;

  @Autowired
  public ApplicationProperties(
      @Value("${providers.reddit.username}") String redditUsername,
      @Value("${providers.reddit.password}") String redditPassword,
      @Value("${providers.reddit.clientId}") String redditClientId,
      @Value("${providers.reddit.clientSecret}") String redditClientSecret,
      @Value("${providers.twitter.consumerKey}") String twitterConsumerKey,
      @Value("${providers.twitter.consumerSecret}") String twitterConsumerSecret,
      @Value("${providers.twitter.accessToken}") String twitterAccessToken,
      @Value("${providers.twitter.accessTokenSecret}") String twitterAccessTokenSecret
      ) {
    this.redditUsername = redditUsername;
    this.redditPassword = redditPassword;
    this.redditClientId = redditClientId;
    this.redditClientSecret = redditClientSecret;

    this.twitterConsumerKey = twitterConsumerKey;
    this.twitterConsumerSecret = twitterConsumerSecret;
    this.twitterAccessToken = twitterAccessToken;
    this.twitterAccessTokenSecret = twitterAccessTokenSecret;
  }

  public ApplicationProperties() {

  }

  public String getRedditUsername() {
    return redditUsername;
  }

  public String getRedditPassword() {
    return redditPassword;
  }

  public String getRedditClientId() {
    return redditClientId;
  }

  public String getRedditClientSecret() {
    return redditClientSecret;
  }

  public String getTwitterConsumerKey() {
    return twitterConsumerKey;
  }

  public String getTwitterConsumerSecret() {
    return twitterConsumerSecret;
  }

  public String getTwitterAccessToken() {
    return twitterAccessToken;
  }

  public String getTwitterAccessTokenSecret() {
    return twitterAccessTokenSecret;
  }
}
