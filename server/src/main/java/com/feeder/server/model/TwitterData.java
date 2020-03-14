package com.feeder.server.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import com.google.auto.value.AutoValue;

import java.util.Date;
import java.util.Optional;

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

    /** This property is required for serialization. This means all posts must contain a title. */
    @JsonProperty("tweet")
    public abstract String tweet();

    /**
     * {@link java.util.Optional} means this property is NOT required for serialization. Perhaps not
     * all posts contain images.
     */
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
