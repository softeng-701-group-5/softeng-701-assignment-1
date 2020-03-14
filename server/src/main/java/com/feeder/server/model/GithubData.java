package com.feeder.server.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.google.auto.value.AutoValue;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@AutoValue
@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(builder = AutoValue_GithubData.Builder.class)
public abstract class GithubData extends GenericData {

    public static Builder newBuilder() {
        return new AutoValue_GithubData.Builder();
    }

    abstract Builder toBuilder();

    @Override
    public Type feedType() {return Type.GITHUB;}

    // Heading
    // User Icon
    // User name
    // Date/time
    // Text
    // Image
    // Media banner
    // Hyperlink

    @JsonProperty("type")
    public abstract String getEventType();

    @JsonProperty("created_at")
    public abstract String getCreatedAt();

//    public abstract String getUsername();
//
//    public abstract String getUserIcon();

//    @JsonProperty("actor")
//    public void actorUsername(Map<String, Object> actor) {
//        toBuilder().setUsername(((String) actor.get("display_login"))).build();
//    }
//
//    @JsonProperty("actor")
//    public void actorUserIcon(Map<String, Object> actor) {
//        toBuilder().setUserIcon((String) actor.get("avatar_url")).build();
//    }

//    public abstract String eventURL();
//    public abstract Optional <String> eventDescription();
//    public abstract String eventDate();

    @AutoValue.Builder
    @JsonPOJOBuilder(withPrefix = "")
    public interface Builder {
        Builder setEventType(String eventType);

        Builder setCreatedAt(String createdAt);

//        Builder setUsername(String username);
//
//        Builder setUserIcon(String userIcon);

        GithubData build();
    }
}
