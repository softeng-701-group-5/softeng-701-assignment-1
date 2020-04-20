package com.feeder.server.controller;

import com.feeder.server.model.DemoData;
import com.feeder.server.model.GenericData;
import com.feeder.server.model.GithubData;
import com.feeder.server.model.HackerNewsData;
import com.feeder.server.model.RedditData;
import com.feeder.server.model.TwitterData;
import com.feeder.server.model.WeatherData;
import com.feeder.server.provider.FeedProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@CrossOrigin
public class MultiFeedController {

  private static final Logger logger = LoggerFactory.getLogger(MultiFeedController.class);

  @Autowired private FeedProvider<RedditData> redditFeedProvider;
  @Autowired private FeedProvider<GithubData> githubFeedProvider;
  @Autowired private FeedProvider<HackerNewsData> hackerNewsFeedProvider;
  @Autowired private FeedProvider<TwitterData> twitterFeedProvider;
  @Autowired private FeedProvider<WeatherData> weatherDataProvider;

  @GetMapping("/")
  public Flux<? extends GenericData> multiFeedMixerFlow() {
    return Flux.merge(redditFlow(), githubFlow(), hackerNewsFlow(), twitterFlow(), weatherFlow());
  }

  @GetMapping("/reddit")
  public Flux<RedditData> redditFlow() {
    return redditFeedProvider.getFeed();
  }

  @GetMapping("/github")
  public Flux<GithubData> githubFlow() {
    return githubFeedProvider.getFeed();
  }

  @GetMapping("/hackernews")
  public Flux<HackerNewsData> hackerNewsFlow() {
    return hackerNewsFeedProvider.getFeed();
  }

  @GetMapping("/twitter")
  public Flux<TwitterData> twitterFlow() {
    return twitterFeedProvider.getFeed();
  }

  @GetMapping("/weather")
  public Flux<WeatherData> weatherFlow() {
    return weatherDataProvider.getFeed();
  }

  @GetMapping("/demo")
  public Flux<DemoData> serializationDemoFlow() {
    return Flux.just(DemoData.newBuilder().title("Cat").imageURI("http://cat.jpg").build());
  }
}
