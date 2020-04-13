package com.feeder.server.model.data.github;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.auto.value.AutoValue;

@AutoValue
@JsonIgnoreProperties(ignoreUnknown = true)
public abstract class Repository {

  @JsonCreator
  public static Repository create(
      @JsonProperty("name") String name, @JsonProperty("url") String url) {
    return new AutoValue_Repository(name, url);
  }

  @JsonProperty("name")
  public abstract String name();

  @JsonProperty("url")
  public abstract String url();
}
