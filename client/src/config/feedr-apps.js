const {
  BASE_URL,
  REDDIT_CLIENT_ID,
  REDDIT_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  TWITTER_CLIENT_ID,
  TWITTER_CLIENT_SECRET,
} = process.env;

const opt = {
  baseUrl: BASE_URL,
  reddit: {
    clientId: REDDIT_CLIENT_ID,
    clientSecret: REDDIT_CLIENT_SECRET,
  },
  github: {
    clientId: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
  },
  twitter: {
    clientId: TWITTER_CLIENT_ID,
    clientSecret: TWITTER_CLIENT_SECRET,
  },
};

export const APPS = () => ({
  reddit: {
    name: 'reddit',
    authUrl: '',
    tokenUrl: '',
    redirectUrl: `${opt.baseUrl}/oauth/callback/reddit`,
  },
  github: {
    name: 'github',
    authUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    redirectUrl: `${opt.baseUrl}/oauth/callback/github`,
  },
  twitter: {
    name: 'twitter',
    authUrl: '',
    tokenUrl: '',
    redirectUrl: `${opt.baseUrl}/oauth/callback/twitter`,
  },
});
