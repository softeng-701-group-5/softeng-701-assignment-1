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
  private String githubUsername;
  private String githubPassword;
  private String githubEtag;

  @Autowired
  public ApplicationProperties(
      @Value("${providers.reddit.username}") String redditUsername,
      @Value("${providers.reddit.password}") String redditPassword,
      @Value("${providers.reddit.clientId}") String redditClientId,
      @Value("${providers.reddit.clientSecret}") String redditClientSecret,
      @Value("${providers.github.username}") String githubUsername,
      @Value("${providers.github.password}") String githubPassword,
      @Value("${providers.github.etag}") String githubEtag) {
    this.redditUsername = redditUsername;
    this.redditPassword = redditPassword;
    this.redditClientId = redditClientId;
    this.redditClientSecret = redditClientSecret;
    this.githubUsername = githubUsername;
    this.githubPassword = githubPassword;
    this.githubEtag = githubEtag;
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

  public String getGithubUsername() {
    return githubUsername;
  }

  public String getGithubPassword() {
    return githubPassword;
  }

  public String getGithubEtag() {
    return githubEtag;
  }

}
