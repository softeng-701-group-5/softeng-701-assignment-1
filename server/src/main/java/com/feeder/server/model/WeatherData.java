package com.feeder.server.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import com.google.auto.value.AutoValue;

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

  @JsonProperty("name")
  public abstract String name();

  @JsonProperty("main")
  public abstract Object main();

  @JsonProperty("weather")
  public abstract Object weather();

  @JsonProperty("visibility")
  public abstract String visibility();

  @JsonProperty("base")
  public abstract String base();

  @JsonProperty("timezone")
  public abstract String timezone();

  @JsonProperty("wind")
  public abstract Object wind();

  @JsonProperty("dt")
  public abstract String dt();

  @JsonProperty("clouds")
  public abstract Object clouds();

  @JsonProperty("sys")
  public abstract Object sys();

  @JsonProperty("id")
  public abstract String id();

  @JsonProperty("cod")
  public abstract String cod();

  @AutoValue.Builder
  @JsonPOJOBuilder(withPrefix = "set")
  public abstract static class Builder {

    public abstract Builder setName(String name);

    public abstract Builder setMain(Object main);

    public abstract Builder setVisibility(String visibility);

    public abstract Builder setWeather(Object weather);

    public abstract Builder setBase(String base);

    public abstract Builder setTimezone(String timezone);

    public abstract Builder setWind(Object wind);

    public abstract Builder setDt(String dt);

    public abstract Builder setClouds(Object clouds);

    public abstract Builder setSys(Object sys);

    public abstract Builder setId(String id);

    public abstract Builder setCod(String cod);

    public abstract String cod();

    abstract WeatherData autoBuild();

    public WeatherData build() {
      return autoBuild();
    }
  }
}
