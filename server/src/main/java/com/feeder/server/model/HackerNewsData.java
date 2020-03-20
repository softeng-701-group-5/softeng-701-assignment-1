package com.feeder.server.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import com.google.auto.value.AutoValue;
import java.util.Optional;
import org.springframework.web.util.HtmlUtils;

@AutoValue
@JsonInclude(Include.NON_ABSENT)
@JsonDeserialize(builder = AutoValue_HackerNewsData.Builder.class)
public abstract class HackerNewsData extends GenericData {

  public static Builder newBuilder() {
    return new AutoValue_HackerNewsData.Builder();
  }

  @Override
  public Type feedType() {
    return Type.HACKERNEWS;
  }

  /** This property is required for serialization. This means all posts must contain an id. */

  @JsonProperty("id")
  public abstract int id();

  /**
   * {@link java.util.Optional} means these properties are NOT required for serialization.
   */

  @JsonProperty("title")
  public abstract Optional<String> title();

  @JsonProperty("username")
  public abstract Optional<String> by();

  @JsonProperty("time")
  public abstract Optional<Integer> time();

  @JsonProperty("url")
  public abstract Optional<String> url();

  @JsonProperty("body")
  public abstract Optional<String> text();

  @JsonProperty("score")
  public abstract Optional<Integer> score();

  @AutoValue.Builder
  @JsonPOJOBuilder(withPrefix = "set")
  public abstract static class Builder {
    public abstract Builder setId(int id);

    public abstract Builder setTitle(String title);

    public abstract Builder setBy(String by);

    public abstract Builder setTime(Integer time);

    public abstract Builder setUrl(String url);

    public abstract Builder setScore(Integer score);

    public abstract Builder setText(String text);

    abstract int id();

    abstract Optional<String> url();

    abstract Optional<String> text();

    abstract HackerNewsData autoBuild();

    public HackerNewsData build() {
      setUrl(url().orElse("https://news.ycombinator.com/ask/" + id()));
      setText(HtmlUtils.htmlUnescape(text().orElse("")));
      return autoBuild();
    }
  }
}
