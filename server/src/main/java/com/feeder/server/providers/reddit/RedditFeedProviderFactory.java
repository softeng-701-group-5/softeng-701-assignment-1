package com.feeder.server.providers.reddit;

import com.feeder.server.ApplicationProperties;
import net.dean.jraw.RedditClient;
import net.dean.jraw.http.NetworkAdapter;
import net.dean.jraw.http.OkHttpNetworkAdapter;
import net.dean.jraw.http.UserAgent;
import net.dean.jraw.oauth.Credentials;
import net.dean.jraw.oauth.OAuthHelper;
import org.springframework.stereotype.Service;

@Service
public class RedditFeedProviderFactory {

    private RedditFeedProvider redditFeedProvider;

    public RedditFeedProvider createProvider(ApplicationProperties properties) {
        validateRedditProperties(properties);

        // Do not create a new RedditFeedProvider if one already exists
        // TODO: When implementing interactive OAuth we will need to create a Provider for each user
        if (redditFeedProvider != null) {
            return redditFeedProvider;
        }

        // UserAgent and Credentials are used to get an OAuth token for the RedditClient
        UserAgent userAgent = new UserAgent("web", "com.feeder.server.providers.reddit",
                "v0.1", properties.getRedditUsername());

        Credentials credentials = Credentials.script(properties.getRedditUsername(), properties.getRedditPassword(),
                properties.getRedditClientId(), properties.getRedditClientSecret());

        NetworkAdapter adapter = new OkHttpNetworkAdapter(userAgent);

        RedditClient redditClient = getAuthenticatedClient(adapter, credentials);

        redditFeedProvider = new RedditFeedProvider(redditClient);

        return redditFeedProvider;
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
