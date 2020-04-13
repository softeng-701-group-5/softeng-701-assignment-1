package com.feeder.server.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import com.feeder.server.model.AutoValue_CovidNineteenData;
import com.google.auto.value.AutoValue;
import java.util.Optional;

@AutoValue
@JsonInclude(Include.NON_ABSENT)
@JsonDeserialize(builder = AutoValue_DemoData.Builder.class)
public abstract class DemoData extends GenericData {

  public static Builder newBuilder() {
    return new AutoValue_DemoData.Builder();
  }

  @Override
  public Type feedType() {
    return Type.DEMO;
  }

  /** This property is required for serialization. This means all posts must contain a title. */
  @JsonProperty("title")
  public abstract String title();

  /**
   * {@link java.util.Optional} means this property is NOT required for serialization. Perhaps not
   * all posts contain images.
   */
  @JsonProperty("imageURI")
  public abstract Optional<String> imageURI();

  @JsonProperty("description")
  public abstract Optional<String> description();

  @AutoValue.Builder
  @JsonPOJOBuilder(withPrefix = "")
  public interface Builder {
    Builder title(String title);

    Builder imageURI(String imageUrl);

    Builder description(String description);

    DemoData build();
  }
}
