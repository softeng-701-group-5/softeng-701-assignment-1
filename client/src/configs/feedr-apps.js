const {
  REACT_APP_BASE_URL,
  REACT_APP_REDDIT_CLIENT_ID,
  REACT_APP_REDDIT_CLIENT_SECRET,
  REACT_APP_GITHUB_CLIENT_ID,
  REACT_APP_GITHUB_CLIENT_SECRET,
  REACT_APP_TWITTER_CLIENT_ID,
  REACT_APP_TWITTER_CLIENT_SECRET,
} = process.env;

const APPS = {
  reddit: {
    name: 'reddit',
    authUrl: '',
    tokenUrl: '',
    authUrl: `https://www.reddit.com/api/v1/authorize?client_id=CLIENT_ID&response_type=TYPE&
    state=RANDOM_STRING&redirect_uri=URI&duration=DURATION&scope=SCOPE_STRING`,
    redirectUrl: `${REACT_APP_BASE_URL}/oauth/callback/reddit`,
    clientId: REACT_APP_REDDIT_CLIENT_ID,
    clientSecret: REACT_APP_REDDIT_CLIENT_SECRET,
  },
  github: {
    name: 'github',
    authUrl: 'https://github.com/login/oauth/authorize', // TODO: Remove?
    tokenUrl: 'https://github.com/login/oauth/access_token', // TODO: Remove?
    redirectUrl: `${REACT_APP_BASE_URL}/connect`,
    clientId: REACT_APP_GITHUB_CLIENT_ID,
    clientSecret: REACT_APP_GITHUB_CLIENT_SECRET,
  },
  twitter: {
    name: 'twitter',
    reqUrl: 'https://api.twitter.com/oauth/request_token', // TODO: Remove?
    authUrl: 'https://api.twitter.com/oauth/authorize', // TODO: Remove?
    tokenUrl: 'https://api.twitter.com/oauth/access_token',
    redirectUrl: `${REACT_APP_BASE_URL}/connect`,
    clientId: REACT_APP_TWITTER_CLIENT_ID,
    clientSecret: REACT_APP_TWITTER_CLIENT_SECRET,
  },
};

module.exports = APPS;
