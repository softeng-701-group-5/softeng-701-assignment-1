import APPS from '../configs/feedr-apps';
import axios from 'axios';

export const oauth = {
  authorizeApp: app => {
    switch (app) {
      case APPS.reddit.name:
        authorizeReddit();
        break;
      case APPS.github.name:
        authorizeGithub();
        break;
      case APPS.twitter.name:
        authorizeTwitter();
        break;
        // TODO: Handle somehow
        break;
    }
  },
  getAppToken: (app, args) => {
    switch (app) {
      case APPS.reddit.name:
        getRedditToken(args);
        break;
      case APPS.github.name:
        getGithubToken(args);
        break;
      case APPS.twitter.name:
        getTwitterToken(args);
        break;
        // TODO: Handle somehow
        break;
    }
  },
};

/** Reddit */
const authorizeReddit = () => {};

const getRedditToken = args => {};

/** GitHub */
const authorizeGithub = () => {
  console.log('authorizing!!');
  const { authUrl, clientId, redirectUrl } = APPS.github;

  window.location.assign(
    `${authUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}`
  );
};

const getGithubToken = args => {
  const code = parseUrlQuery(args).code;
  const { tokenUrl, clientId, clientSecret } = APPS.github;

  const opt = {
    method: 'POST',
    url: `${tokenUrl}?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`,
    headers: {
      accept: 'application/json',
    },
  };

  axios(opt)
    .then(resp => console.log(resp.data))
    .catch(err => console.error(err));
};

/** Twitter */
const authorizeTwitter = () => {};

const getTwitterToken = args => {};

// --------------------------

const parseUrlQuery = query => {
  // https://stackoverflow.com/questions/8648892/how-to-convert-url-parameters-to-a-javascript-object
  return JSON.parse(
    '{"' + query.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    (key, value) => {
      return key === '' ? value : decodeURIComponent(value);
    }
  );
};
