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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RedditFeedProvider {

    private static final Logger logger = LoggerFactory.getLogger(RedditFeedProvider.class);
    private RedditClient redditClient;

    public RedditFeedProvider(ApplicationProperties properties) {
        validateRedditProperties(properties);

        UserAgent userAgent = new UserAgent("web", "com.feeder.server.providers.reddit", "v0.1", properties.getRedditUsername());

        Credentials credentials = Credentials.script(properties.getRedditUsername(), properties.getRedditPassword(),
                properties.getRedditClientId(), properties.getRedditClientSecret());

        NetworkAdapter adapter = new OkHttpNetworkAdapter(userAgent);

        redditClient = OAuthHelper.automatic(adapter, credentials);
    }

    public List<Submission> getFeed(int numberOfItems) {

        Paginator.Builder<Submission> builder = redditClient.frontPage().limit(numberOfItems);

        Paginator paginator = builder.build();

        List submissions = paginator.accumulate(1);

        submissions.forEach(s -> logger.info(s.toString()));

        // TODO: Map the submissions to a different type for processing with other social media feeds
        return submissions;
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