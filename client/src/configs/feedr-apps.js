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
    redirectUrl: `${REACT_APP_BASE_URL}/oauth/callback/reddit`,
    clientId: REACT_APP_REDDIT_CLIENT_ID,
    clientSecret: REACT_APP_REDDIT_CLIENT_SECRET,
  },
  github: {
    name: 'github',
    authUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    redirectUrl: `${REACT_APP_BASE_URL}/connect`,
    clientId: REACT_APP_GITHUB_CLIENT_ID,
    clientSecret: REACT_APP_GITHUB_CLIENT_SECRET,
  },
  twitter: {
    name: 'twitter',
    reqUrl: 'https://api.twitter.com/oauth/request_token', // Twitter has an extra step for auth
    authUrl: 'https://api.twitter.com/oauth/authorize',
    tokenUrl: 'https://api.twitter.com/oauth/access_token',
    redirectUrl: `${REACT_APP_BASE_URL}/connect`,
    clientId: REACT_APP_TWITTER_CLIENT_ID,
    clientSecret: REACT_APP_TWITTER_CLIENT_SECRET,
  },
};

module.exports = APPS;
