package com.feeder.server.provider.reddit;

import com.feeder.server.model.RedditData;
import com.feeder.server.provider.FeedProvider;
import java.util.Iterator;
import net.dean.jraw.RedditClient;
import net.dean.jraw.models.Listing;
import net.dean.jraw.models.Submission;
import net.dean.jraw.pagination.Paginator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

/**
 * A RedditFeedProvider is responsible for retrieving Reddit posts from a users homepage from the
 * Reddit API.
 */
@Service
public class RedditFeedProvider implements FeedProvider<RedditData> {

  //private static final String REDDIT_API_BASE_URL = "https://oauth.reddit.com";

 @Autowired private RedditClient redditClient;

  private WebClient.Builder webClientBuilder;

  @Override
  public Flux<RedditData> getFeed() {

    Paginator paginator = redditClient.frontPage().build();

    // Only get the first page of results, because pagination is not yet supported
    Iterator<Listing<Submission>> items = paginator.iterator();

    // Iterate through all the posts in the front page and build the RedditDate type for each post.
    Flux<RedditData> redditDataFlux =
        Flux.fromIterable(items.next())
            .map(
                submission ->
                    RedditData.newBuilder()
                        .title(submission.getTitle())
                        .author(submission.getAuthor())
                        .created(submission.getCreated())
                        .subreddit(submission.getSubreddit())
                        .url(submission.getUrl())
                        .thumbnail(submission.getThumbnail())
                        .selftext(submission.getSelfText())
                        .build());

    return redditDataFlux;
  }
}
