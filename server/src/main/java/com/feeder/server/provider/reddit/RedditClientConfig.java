package com.feeder.server.provider.reddit;

import com.feeder.server.ApplicationProperties;
import net.dean.jraw.RedditClient;
import net.dean.jraw.http.NetworkAdapter;
import net.dean.jraw.http.OkHttpNetworkAdapter;
import net.dean.jraw.http.UserAgent;
import net.dean.jraw.oauth.Credentials;
import net.dean.jraw.oauth.OAuthHelper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RedditClientConfig {

  @Bean
  public RedditClient getClient(ApplicationProperties properties) {
    validateRedditProperties(properties);

    // UserAgent and Credentials are used to get an OAuth token for the RedditClient
    UserAgent userAgent =
        new UserAgent(
            "web", "com.feeder.server.providers.reddit", "v0.1", properties.getRedditUsername());

    Credentials credentials =
        Credentials.script(
            properties.getRedditUsername(),
            properties.getRedditPassword(),
            properties.getRedditClientId(),
            properties.getRedditClientSecret());

    NetworkAdapter adapter = new OkHttpNetworkAdapter(userAgent);

    return OAuthHelper.automatic(adapter, credentials);
  }

  private void validateRedditProperties(ApplicationProperties properties) {
    if (properties == null) {
      throw new IllegalStateException("ApplicationProperties is not defined");
    }

    if (properties.getRedditUsername() == null || properties.getRedditUsername().isBlank()) {
      throw new IllegalStateException("providers.reddit.username is not defined");
    }

    if (properties.getRedditPassword() == null || properties.getRedditPassword().isBlank()) {
      throw new IllegalStateException("providers.reddit.password is not defined");
    }

    if (properties.getRedditClientId() == null || properties.getRedditClientId().isBlank()) {
      throw new IllegalStateException("providers.reddit.clientId is not defined");
    }

    if (properties.getRedditClientSecret() == null
        || properties.getRedditClientSecret().isBlank()) {
      throw new IllegalStateException("providers.reddit.clientSecret is not defined");
    }
  }
}
