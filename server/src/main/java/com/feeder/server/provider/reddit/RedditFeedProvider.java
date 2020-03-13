package com.feeder.server.provider.reddit;

import com.feeder.server.model.RedditData;
import com.feeder.server.provider.FeedProvider;
import java.util.List;
import net.dean.jraw.RedditClient;
import net.dean.jraw.models.Listing;
import net.dean.jraw.models.Submission;
import net.dean.jraw.pagination.Paginator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

/**
 * A RedditFeedProvider is responsible for retrieving Reddit posts from a users homepage from the
 * Reddit API.
 */
@Service
public class RedditFeedProvider implements FeedProvider<RedditData> {

  @Autowired private RedditClient redditClient;

  /**
   * Returns Reddit posts/submissions on the users front page, the user is defined by the
   * ApplicationProperties.
   *
   * @param numberOfItems number of submissions to return
   * @return List of submissions
   */
  public List<Listing<Submission>> getFeed(int numberOfItems) {

    // Make a request for the front page
    Paginator paginator = redditClient.frontPage().limit(numberOfItems).build();

    // Only get the first page of results, because pagination is not yet supported
    List<Listing<Submission>> submissions = paginator.accumulate(1);

    // TODO: Map the submissions to a different type for processing with other social media feeds
    return submissions;
  }

  @Override
  public Flux<RedditData> getFeed() {
    // TODO: Reddit team to implement
    return Flux.empty();
  }
}
