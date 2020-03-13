package com.feeder.server.provider.github;

import com.feeder.server.ApplicationProperties;
import com.feeder.server.model.GithubData;
import com.feeder.server.provider.FeedProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

import java.util.List;

@Service
public class GithubFeedProvider implements FeedProvider<GithubData> {

  private final String GITHUB_API_BASE_URL = "https://api.github.com";
  private final String GITHUB_v3_MIME_TYPE = "application/vnd.github.v3+json";
  private String eTag = "";

  @Autowired
  ApplicationProperties applicationProperties;

  private WebClient.Builder webClientBuilder;

  public WebClient.Builder getWebClientBuilder() {
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
  
  private void assignEtag(List<String> etag) {
    for (String s: etag) {
      this.eTag = s;
    }
  }

  @Override
  public Flux<GithubData> getFeed() {
    // TODO: Github team to implement

    WebClient webClient = getWebClientBuilder().build();

    return webClient.get()
            .uri("/users//received_events")
            .exchange()
            .doOnSuccess(clientResponse -> assignEtag(clientResponse.headers().header("Etag")))
            .flatMapMany(clientResponse -> clientResponse.bodyToFlux(GithubData.class));
  }
}
