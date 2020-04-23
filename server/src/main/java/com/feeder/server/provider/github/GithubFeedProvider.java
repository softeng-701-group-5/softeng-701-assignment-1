package com.feeder.server.provider.github;

import com.feeder.server.ApplicationProperties;
import com.feeder.server.model.GithubData;
import com.feeder.server.provider.FeedProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

/**
 * A GithubFeedProvider is responsible for retrieving Github events from the user's Github home
 * page, using the Github API
 */
@Service
public class GithubFeedProvider implements FeedProvider<GithubData> {

  private static final String GITHUB_API_BASE_URL = "https://api.github.com";
  private static final String GITHUB_v3_MIME_TYPE = "application/vnd.github.v3+json";
  private static final Logger logger = LoggerFactory.getLogger(GithubFeedProvider.class);

  @Autowired ApplicationProperties applicationProperties;

  private WebClient.Builder webClientBuilder;

  @Override
  public Flux<GithubData> getFeed() {

    //Need to get username to get the feed
    String apiEndpointReceivedEvents =
        "/users/" + applicationProperties.getGithubUsername() + "/received_events";

    WebClient webClient = getWebClientBuilder().build();

    // For each Github event retrieved, build the GithubData type
    return webClient
        .get()
        .uri(apiEndpointReceivedEvents)
        .headers(headers -> headers.setBearerAuth("Add access token"))
        .exchange()
        .flatMapMany(clientResponse -> clientResponse.bodyToFlux(GithubData.class));
  }

  /**
   * Builds the client with the correct headers for auth and content type specification, required to
   * call the API
   *
   * @return WebClient.Builder
   */
  private WebClient.Builder getWebClientBuilder() {
    if (this.webClientBuilder == null) {
      this.webClientBuilder =
          WebClient.builder()
              .baseUrl(GITHUB_API_BASE_URL)
              .defaultHeader(HttpHeaders.CONTENT_TYPE, GITHUB_v3_MIME_TYPE)
              .defaultHeader(HttpHeaders.AUTHORIZATION);
    }
    return this.webClientBuilder;
  }
}
