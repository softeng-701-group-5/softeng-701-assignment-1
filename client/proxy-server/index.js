// REFERENCE: https://github.com/reddit-archive/reddit/wiki/OAuth2

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const qs = require('querystring');
const APPS = require('../src/configs/feedr-apps');

const reddit = APPS.reddit;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Endpoint for the React app to call after receiving a code when the user
 * successfully logs into Reddit. This endpoint will use that code to get the
 * final access_token (and relavent metadata), and redirect back to the React app
 */
app.get('/proxy/reddit/token', (req, reactRes) => {
  const url = reddit.tokenUrl;
  const data = {
    grant_type: 'authorization_code',
    code: req.query.code,
    redirect_uri: reddit.redirectUrl,
  };
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(
          unescape(
            encodeURIComponent(reddit.clientId + ':' + reddit.clientSecret)
          )
        ).toString('base64'),
    },
  };

  // Make the final request to Reddit to get the access_token
  axios.post(url, qs.stringify(data), config).then(
    res => {
      // Redirect back to the React app
      reactRes.send(JSON.stringify(res.data));
    },
    err => {
      // TODO: Handle error
    }
  );
});

/**
 * Endpoint for the React app to call in order to refresh a Reddit access_token.
 */
app.post('/proxy/reddit/refresh', (req, reactRes) => {
  const url = reddit.tokenUrl;
  const data = {
    grant_type: 'refresh_token',
    refresh_token: req.body.refresh_token,
  };
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(
          unescape(
            encodeURIComponent(reddit.clientId + ':' + reddit.clientSecret)
          )
        ).toString('base64'),
    },
  };

  // Make the final request to Reddit to refresh the access_token
  axios.post(url, qs.stringify(data), config).then(
    res => {
      // Redirect back to the React app
      reactRes.send(JSON.stringify(res.data));
    },
    err => {
      // TODO: Handle error
    }
  );
});

/**
 * Endpoint for Reddit to redirect to after the first step of authorization,
 * i.e. after the user sucessfully logs into Reddit. The code (and state) will
 * then be sent back to the React app via redirection to its CallbackPage, with
 * the paramters set in the query string of the URL.
 */
app.get('/proxy/callback/reddit', (req, res) => {
  // Redirect back to the React app
  res.redirect(
    `${APPS._client.url}/oauth/callback/reddit?state=${req.query.state}&code=${req.query.code}`
  );
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
