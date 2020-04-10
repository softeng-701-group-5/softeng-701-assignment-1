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


  @JsonProperty("name")
  public abstract Optional<String> name();

  @JsonProperty("main")
  public abstract Optional<Object> main();
  @JsonProperty("weather")
  public abstract Optional<Object> weather();
  @JsonProperty("visibility")
  public abstract Optional<Object> visibility();
  @JsonProperty("base")
  public abstract Optional<Object> base();
  @JsonProperty("timezone")
  public abstract Optional<Object> timezone();
  @JsonProperty("wind")
  public abstract Optional<Object> wind();
  @JsonProperty("dt")
  public abstract Optional<Object> dt();
  @JsonProperty("clouds")
  public abstract Optional<Object> clouds();
  @JsonProperty("sys")
  public abstract Optional<Object> sys();
  @JsonProperty("id")
  public abstract Optional<Object> id();
  @JsonProperty("cod")
  public abstract Optional<Object> cod();

  @AutoValue.Builder
  @JsonPOJOBuilder(withPrefix = "set")
  public abstract static class Builder {

    public abstract Builder setName(String name);

    public abstract Builder setMain(Object main);
    public abstract Builder setVisibility(Object visibility);
    public abstract Builder setWeather(Object weather);
    public abstract Builder setBase(Object base);
    public abstract Builder setTimezone(Object timezone);
    public abstract Builder setWind(Object wind);
    public abstract Builder setDt(Object dt);
    public abstract Builder setClouds(Object clouds);
    public abstract Builder setSys(Object sys);
    public abstract Builder setId(Object id);
    public abstract Builder setCod(Object cod);

    public abstract Optional<Object> cod();
    abstract WeatherData autoBuild();

    public WeatherData build() {
      return autoBuild();
    }
  }
}
