package com.feeder.server.model.github;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.auto.value.AutoValue;

@AutoValue
@JsonIgnoreProperties(ignoreUnknown = true)
public abstract class Actor {

  @JsonCreator
  public static Actor create(
      @JsonProperty("display_login") String login,
      @JsonProperty("url") String url,
      @JsonProperty("avatar_url") String avatarUrl) {
    return new AutoValue_Actor(login, url, avatarUrl);
  }

  @JsonProperty("display_login")
  public abstract String login();

  @JsonProperty("url")
  public abstract String url();

  @JsonProperty("avatar_url")
  public abstract String avatarUrl();
}
