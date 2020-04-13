package com.feeder.server.model.data.github;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.feeder.server.model.data.github.Payload.Deserializer;
import com.google.auto.value.AutoValue;
import java.io.IOException;
import java.util.Arrays;

@AutoValue
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonDeserialize(using = Deserializer.class)
public abstract class Payload {

  public static Payload create(Subject subject, String action) {
    return new AutoValue_Payload(subject, action);
  }

  @JsonProperty("subject")
  public abstract Subject subject();

  @JsonProperty("action")
  public abstract String action();

  public enum Subject {
    UNKNOWN("unknown"),
    PULL_REQUEST("pull_request"),
    COMMITS("commits"),
    ISSUE("issue");

    String property;

    Subject(String property) {
      this.property = property;
    }
  }

  public static class Deserializer extends StdDeserializer<Payload> {

    public Deserializer() {
      this(null);
    }

    public Deserializer(Class<?> vc) {
      super(vc);
    }

    @Override
    public Payload deserialize(JsonParser parser, DeserializationContext context)
        throws IOException {
      JsonNode node = parser.getCodec().readTree(parser);
      Subject subject =
          Arrays.stream(Subject.values())
              .filter(s -> node.has(s.property))
              .findFirst()
              .orElse(Subject.UNKNOWN);
      String action = node.has("action") ? node.get("action").asText() : "unknown";
      return create(subject, action);
    }
  }
}
