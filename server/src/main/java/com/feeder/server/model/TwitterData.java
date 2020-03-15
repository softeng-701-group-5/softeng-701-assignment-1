package com.feeder.server.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import com.google.auto.value.AutoValue;

import java.util.Date;

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

    @JsonProperty("tweet")
    public abstract String tweet();

    @JsonProperty("profileImageURI")
    public abstract String profileImageURI();

    @JsonProperty("profileUsername")
    public abstract String profileUsername();

    @JsonProperty("tweetPostDate")
    public abstract Date tweetPostDate();

    @AutoValue.Builder
    @JsonPOJOBuilder(withPrefix = "")
    public interface Builder {
        TwitterData.Builder tweet(String tweet);

        TwitterData.Builder profileImageURI(String profileImageURI);

        TwitterData.Builder profileUsername(String profileUsername);

        TwitterData.Builder tweetPostDate(Date tweetPostDate);

        TwitterData build();
    }
}
