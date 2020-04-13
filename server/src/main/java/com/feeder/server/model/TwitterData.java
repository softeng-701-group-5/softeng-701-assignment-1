package com.feeder.server.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import com.feeder.server.model.AutoValue_TwitterData;
import com.google.auto.value.AutoValue;
import java.util.Date;
import java.util.Optional;

/** A TwitterData type represents the properties of a tweet */
@AutoValue
@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(builder = AutoValue_TwitterData.Builder.class)
public abstract class TwitterData extends GenericData {

  public static TwitterData.Builder newBuilder() {
    return new AutoValue_TwitterData.Builder();
  }

  @Override
  public Type feedType() {
    return Type.TWITTER;
  }

  /** These properties are required for serialization, all posts must contain them. */
  @JsonProperty("tweet")
  public abstract String tweet();

  @JsonProperty("profileImageURI")
  public abstract String profileImageURI();

  @JsonProperty("profileUsername")
  public abstract String profileUsername();

  @JsonProperty("tweetPostDate")
  public abstract Date tweetPostDate();

  /** {@link java.util.Optional} means these properties are NOT required for serialization. */
  // Tweets can contain multiple images, But only need to display one for now
  @JsonProperty("imageLink")
  public abstract Optional<String> tweetMediaURL();

  @AutoValue.Builder
  @JsonPOJOBuilder(withPrefix = "")
  public interface Builder {
    TwitterData.Builder tweet(String tweet);

    TwitterData.Builder profileImageURI(String profileImageURI);

    TwitterData.Builder profileUsername(String profileUsername);

    TwitterData.Builder tweetPostDate(Date tweetPostDate);

    TwitterData.Builder tweetMediaURL(String tweetMediaURL);

    TwitterData build();
  }
}
