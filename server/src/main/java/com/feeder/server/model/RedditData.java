package com.feeder.server.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import com.google.auto.value.AutoValue;

@AutoValue
@JsonInclude(Include.NON_EMPTY)
@JsonDeserialize(builder = AutoValue_RedditData.Builder.class)
public abstract class RedditData extends GenericData {

  public static Builder newBuilder() {
    return new AutoValue_RedditData.Builder();
  }

  @JsonProperty("title")
  public abstract String title();

  @JsonProperty("imageURI")
  public abstract String imageURI();

  @JsonProperty("description")
  public abstract String description();

  @AutoValue.Builder
  @JsonPOJOBuilder(withPrefix = "")
  public interface Builder {
    Builder title(String title);

    Builder imageURI(String imageUrl);

    Builder description(String description);

    Builder feedType(Type feedType);

    RedditData build();
  }
}
