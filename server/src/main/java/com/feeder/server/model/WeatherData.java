package com.feeder.server.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import com.google.auto.value.AutoValue;
import java.util.Optional;

@AutoValue
@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(builder = AutoValue_WeatherData.Builder.class)
public abstract class WeatherData extends GenericData {
  public static Builder newBuilder() {
    return new AutoValue_WeatherData.Builder();
  }

  @Override
  public Type feedType() {
    return Type.WEATHER;
  }

  /** This property is required for serialization. This means all posts must contain an id. */
  @JsonProperty("id")
  public abstract int id();

  @JsonProperty("name")
  public abstract Optional<String> name();

  @JsonProperty("main")
  public abstract Optional<String> main();

  @AutoValue.Builder
  @JsonPOJOBuilder(withPrefix = "")
  public abstract static class Builder {
    public abstract Builder setId(int id);

    public abstract Builder setName(String name);

    public abstract Builder setMain(String main);

    abstract int id();

    abstract WeatherData autoBuild();

    public WeatherData build() {
      id();
      return autoBuild();
    }
  }
}
