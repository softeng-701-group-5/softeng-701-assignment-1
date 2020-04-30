import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import APPS from '../configs/feedr-apps';
import CookieManager from '../components/oauth/CookieManager';
import { parseUrlQuery } from '../common/QueryParser';

/**
 * There is no node module for Reddit login, so use this callback with RedditConnect.jsx
 * and /proxy-server/index.js to retrieve an access_token.
 */
export const CallbackPage = props => {
  const params = useParams();

  useEffect(() => {
    /**
     * This is where the proxy server redirects to after getting a code in the first step
     * of the authorization journey for Reddit.
     * 
     * Call the proxy server to get the final access_token.
     * Successful authorization returns an object with the form:
      {
        "access_token": "000000000000-xxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "token_type": "bearer",
        "expires_in": 3600,
        "refresh_token": "000000000000-xxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "scope": "read"
      }
     */
    if (params.app === 'reddit') {
      fetch('/proxy/reddit/token' + props.location.search, {
        crossDomain: true,
        headers: { 'Content-Type': 'application/json' },
      })
        .then(resp => resp.json())
        .then(data => {
          // Add the exipres_at field to indicate when to refresh the access_token
          data.expires_at = new Date(
            new Date().getTime() + data.expires_in * 1000
          );
          CookieManager.setUserToken(data, APPS.reddit.name);
        })
        .then(props.history.push('/'));
    }

    /**
     * This is where the proxy server redirects to after getting a code in the first step
     * of the authorization journey for GitHub.
     * 
     * Call the proxy server to get the final access_token.
     * Successful authorization returns an object with the form:
      {
        "access_token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "scope": "notifications,read:discussion,read:org,read:user",
        "token_type": "bearer"
      }
     */
    if (params.app === 'github') {
      fetch('/proxy/github/token' + props.location.search, {
        crossDomain: true,
        headers: { 'Content-Type': 'application/json' },
      })
        .then(resp => resp.json())
        .then(data =>
          CookieManager.setUserToken(parseUrlQuery(data), APPS.github.name)
        )
        .then(props.history.push('/'));
    }
  });

  return <div>Redirecting, please wait...</div>;
};
