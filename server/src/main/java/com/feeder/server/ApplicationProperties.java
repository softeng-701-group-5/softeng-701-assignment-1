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

  @Autowired
  public ApplicationProperties(
      @Value("se701-group5-user") String redditUsername,
      @Value("JuN4vW0$!f5t") String redditPassword,
      @Value("9cVkgwkN9fhj9g") String redditClientId,
      @Value("zGjwl2XD0PKdO4IJcYvsGxinffE") String redditClientSecret) {
    this.redditUsername = redditUsername;
    this.redditPassword = redditPassword;
    this.redditClientId = redditClientId;
    this.redditClientSecret = redditClientSecret;
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
}
