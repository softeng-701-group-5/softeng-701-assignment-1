package com.feeder.server.providers.reddit;

import static org.junit.jupiter.api.Assertions.fail;

import com.feeder.server.ApplicationProperties;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class RedditClientConfigTest {

  private ApplicationProperties emptyProperties;
  private RedditClientConfig redditClientConfig;

  @BeforeEach
  public void setup() {
    emptyProperties = new ApplicationProperties("", "", "", "");
    redditClientConfig = new RedditClientConfig();
  }

  @Test
  public void testPropertyValidation() {
    try {
      redditClientConfig.getClient(emptyProperties);
      fail();
    } catch (IllegalStateException ignored) {
    }
  }
}
