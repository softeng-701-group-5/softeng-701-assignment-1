package com.feeder.server.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import com.feeder.server.model.AutoValue_RedditData;
import com.google.auto.value.AutoValue;
import java.util.Date;
import java.util.Optional;

/** A RedditData type represents the properties of a Reddit feed post */
@AutoValue
@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(builder = AutoValue_RedditData.Builder.class)
public abstract class RedditData extends GenericData {

  public static Builder newBuilder() {
    return new AutoValue_RedditData.Builder();
  }

  @Override
  public Type feedType() {
    return Type.REDDIT;
  }

  /** These properties are required for serialization. This means all posts must contain a title. */
  @JsonProperty("title")
  public abstract String title();

  @JsonProperty("author")
  public abstract String author();

  @JsonProperty("created")
  public abstract Date created();

  @JsonProperty("subreddit")
  public abstract String subreddit();

  @JsonProperty("url")
  public abstract String url();

  /**
   * {@link java.util.Optional} means this property is NOT required for serialization. Perhaps not
   * all posts contain images. If there is no thumbnail, then the string "self" is returned.
   */
  @JsonProperty("thumbnail")
  public abstract Optional<String> thumbnail();

  /**
   * Self Text is the text within a post. Not all posts on reddit may contain text. If there is no
   * text, then an empty string is returned.
   */
  @JsonProperty("selftext")
  public abstract Optional<String> selftext();

  @AutoValue.Builder
  @JsonPOJOBuilder(withPrefix = "")
  public interface Builder {
    RedditData.Builder title(String title);

    RedditData.Builder author(String author);

    RedditData.Builder created(Date created);

    RedditData.Builder subreddit(String subreddit);

    RedditData.Builder url(String url);

    RedditData.Builder thumbnail(String thumbnail);

    RedditData.Builder selftext(String selftext);

    RedditData build();
  }
}
