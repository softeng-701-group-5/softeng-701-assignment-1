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

import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
  private String username;

  @Override
  public Flux<GithubData> getFeed() {
    WebClient webClient = getWebClientBuilder().build();

    setUserName();

    return webClient
        .get()
        .uri(GITHUB_API_BASE_URL + "/users/" + username + "/received_events" )
        .headers(headers -> headers.setBearerAuth("576d812d9921c20f4f829b0f6a35881e0ce23628"))
        .exchange()
        .flatMapMany(clientResponse -> clientResponse.bodyToFlux(GithubData.class));
  }

  private void setUserName(){
    WebClient webClient = getWebClientBuilder().build();

    webClient.get()
            .uri("https://api.github.com/user")
            .headers(headers -> headers.setBearerAuth("576d812d9921c20f4f829b0f6a35881e0ce23628"))
            .retrieve()
            .bodyToMono(String.class)
            .subscribe( value -> {
                Pattern pattern = Pattern.compile("login\":\"(.*?)\",", Pattern.DOTALL);
                Matcher matcher = pattern.matcher(value);
                while (matcher.find()) {
                  username = matcher.group(1);
                }
            });
    try {
      Thread.sleep(1000);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
  }

  private void getGithubAccessToken(){

  }

  /**
   * Builds the client with the correct headers for auth and content type specification, required to
   * call the API
   *
   * @return WebClient.Builder
   */
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
