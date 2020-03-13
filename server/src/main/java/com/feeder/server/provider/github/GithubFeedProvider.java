package com.feeder.server.provider.github;

import com.feeder.server.ApplicationProperties;
import com.feeder.server.model.GithubData;
import com.feeder.server.provider.FeedProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class GithubFeedProvider implements FeedProvider<GithubData> {

  private final String GITHUB_API_BASE_URL = "https://api.github.com";
  private final String GITHUB_v3_MIME_TYPE = "application/vnd.github.v3+json";
  private String eTag = "";
  private static final Logger logger = LoggerFactory.getLogger(GithubFeedProvider.class);

  @Autowired
  ApplicationProperties applicationProperties;

  private WebClient.Builder webClientBuilder;

  @Override
  public Flux<GithubData> getFeed() {

    String apiEndpointReceivedEvents = "/users/" + applicationProperties.getGithubUsername() + "/received_events";

    WebClient webClient = getWebClientBuilder().build();

    return webClient.get()
            .uri(apiEndpointReceivedEvents)
            .exchange()
            .doOnSuccess(clientResponse -> assignEtag(clientResponse.headers().header("Etag")))
            .flatMapMany(clientResponse -> clientResponse.bodyToFlux(GithubData.class));

  }

  private void assignEtag(List<String> etag) {
    for (String s: etag) {
      this.eTag = s;
    }
  }

  private WebClient.Builder getWebClientBuilder() {
    if (this.webClientBuilder == null) {
      this.webClientBuilder = WebClient.builder()
              .baseUrl(GITHUB_API_BASE_URL)
              .defaultHeader(HttpHeaders.CONTENT_TYPE, GITHUB_v3_MIME_TYPE)
              .defaultHeader(HttpHeaders.AUTHORIZATION)
              .defaultHeader(HttpHeaders.IF_NONE_MATCH, eTag)
              .defaultHeaders(httpHeaders -> httpHeaders.setBasicAuth(applicationProperties.getGithubUsername(), applicationProperties.getGithubPassword()));
    }
    return this.webClientBuilder;
  }

}
