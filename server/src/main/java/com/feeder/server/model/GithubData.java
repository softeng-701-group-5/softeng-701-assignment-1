package com.feeder.server.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.feeder.server.model.github.Actor;
import com.feeder.server.model.github.Payload;
import com.feeder.server.model.github.Repository;
import com.google.auto.value.AutoValue;
import java.time.LocalDateTime;
import java.util.Optional;

@AutoValue
@JsonInclude(Include.NON_ABSENT)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonDeserialize(builder = AutoValue_GithubData.Builder.class)
public abstract class GithubData extends GenericData {

  public static Builder newBuilder() {
    return new AutoValue_GithubData.Builder();
  }

  @Override
  public Type feedType() {
    return Type.GITHUB;
  }

  @JsonProperty("type")
  public abstract Optional<String> type();

  @JsonSerialize(contentUsing = LocalDateTimeSerializer.class)
  @JsonDeserialize(contentUsing = LocalDateTimeDeserializer.class)
  @JsonProperty("created_at")
  public abstract LocalDateTime createdAt();

  @JsonProperty("actor")
  public abstract Actor actor();

  @JsonProperty("repo")
  public abstract Repository repository();

  @JsonProperty("payload")
  public abstract Payload payload();

  @AutoValue.Builder
  public interface Builder {

    @JsonProperty("type")
    Builder type (String type);

    @JsonProperty("created_at")
    Builder createdAt(LocalDateTime time);

    @JsonProperty("actor")
    Builder actor(Actor actor);

    @JsonProperty("repo")
    Builder repository(Repository repository);

    @JsonProperty("payload")
    Builder payload(Payload payload);

    GithubData build();
  }
}
