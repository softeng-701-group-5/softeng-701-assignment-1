const {
  REACT_APP_BASE_URL,
  REACT_APP_PROXY_URL,
  REACT_APP_REDDIT_CLIENT_ID,
  REACT_APP_REDDIT_CLIENT_SECRET,
  REACT_APP_GITHUB_CLIENT_ID,
  REACT_APP_GITHUB_CLIENT_SECRET,
  REACT_APP_TWITTER_CLIENT_ID,
  REACT_APP_TWITTER_CLIENT_SECRET,
} = process.env;

const APPS = {
  _client: {
    url: REACT_APP_BASE_URL,
  },
  reddit: {
    name: 'reddit',
    authUrl: `https://www.reddit.com/api/v1/authorize`,
    tokenUrl: 'https://www.reddit.com/api/v1/access_token',
    redirectUrl: `${REACT_APP_PROXY_URL}/proxy/callback/reddit`,
    clientId: REACT_APP_REDDIT_CLIENT_ID,
    clientSecret: REACT_APP_REDDIT_CLIENT_SECRET,
  },
  github: {
    name: 'github',
    authUrl: 'https://github.com/login/oauth/authorize', // TODO: Remove? (unused)
    tokenUrl: 'https://github.com/login/oauth/access_token', // TODO: Remove? (unused)
    redirectUrl: `${REACT_APP_BASE_URL}/connect`,
    clientId: REACT_APP_GITHUB_CLIENT_ID,
    clientSecret: REACT_APP_GITHUB_CLIENT_SECRET,
  },
  twitter: {
    name: 'twitter',
    reqUrl: 'https://api.twitter.com/oauth/request_token', // TODO: Remove? (unused)
    authUrl: 'https://api.twitter.com/oauth/authorize', // TODO: Remove? (unused)
    tokenUrl: 'https://api.twitter.com/oauth/access_token', // TODO: Remove? (unused)
    redirectUrl: `${REACT_APP_BASE_URL}/connect`,
    clientId: REACT_APP_TWITTER_CLIENT_ID,
    clientSecret: REACT_APP_TWITTER_CLIENT_SECRET,
  },
};

module.exports = APPS;
