package com.feeder.server.providers.reddit;
import com.feeder.server.ApplicationProperties;
import net.dean.jraw.RedditClient;
import net.dean.jraw.http.NetworkAdapter;
import net.dean.jraw.http.OkHttpNetworkAdapter;
import net.dean.jraw.http.UserAgent;
import net.dean.jraw.models.Submission;
import net.dean.jraw.oauth.Credentials;
import net.dean.jraw.oauth.OAuthHelper;
import net.dean.jraw.pagination.Paginator;
import org.springframework.stereotype.Service;
import java.util.List;

/***
 * A RedditFeedProvider is responsible for retrieving Reddit posts from a users homepage from the Reddit API.
 */
@Service
public class RedditFeedProvider {

    private RedditClient redditClient;

    public RedditFeedProvider(ApplicationProperties properties) {
        validateRedditProperties(properties);

        // UserAgent and Credentials are used to get an OAuth token for the RedditClient
        UserAgent userAgent = new UserAgent("web", "com.feeder.server.providers.reddit",
                "v0.1", properties.getRedditUsername());

        Credentials credentials = Credentials.script(properties.getRedditUsername(), properties.getRedditPassword(),
                properties.getRedditClientId(), properties.getRedditClientSecret());

        NetworkAdapter adapter = new OkHttpNetworkAdapter(userAgent);

        redditClient = getAuthenticatedClient(adapter, credentials);
    }

    /***
     * Returns Reddit posts/submissions on the users front page, the user is defined by the ApplicationProperties.
     *
     * @param numberOfItems number of submissions to return
     * @return List of submissions
     */
    public List<Submission> getFeed(int numberOfItems) {

        // Make a request for the front page
        Paginator paginator = redditClient.frontPage().limit(numberOfItems).build();

        // Only get the first page of results, because pagination is not yet supported
        List submissions = paginator.accumulate(1);

        // TODO: Map the submissions to a different type for processing with other social media feeds
        return submissions;
    }

    protected RedditClient getAuthenticatedClient(NetworkAdapter adapter, Credentials credentials) {
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

        if (properties.getRedditClientSecret() == null || properties.getRedditClientSecret().isBlank()) {
            throw new IllegalStateException("providers.reddit.clientSecret is not defined");
        }
    }
}