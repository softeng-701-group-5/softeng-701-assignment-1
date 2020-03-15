package com.feeder.server.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import com.google.auto.value.AutoValue;
import io.netty.handler.codec.socks.SocksAuthRequest;

import java.util.Optional;

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
    @JsonPOJOBuilder(withPrefix = "")

    public interface Builder {
        Builder title(String title);

        Builder by(String by);

        Builder time(Integer time);

        Builder url(String url);

        Builder score(Integer score);

        Builder text(String text);

        HackerNewsData build();
    }
}