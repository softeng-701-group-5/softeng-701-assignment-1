package com.feeder.server.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import java.net.URI;

@JsonInclude(Include.NON_EMPTY)
public abstract class GenericData {
  public enum Type {
    REDDIT,
    GITHUB,
    SPOTIFY,
    TWITTER
  }

  public String title;
  public URI imageURI;
  public String description;
  public Type feedType;
}
