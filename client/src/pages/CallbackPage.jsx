import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import APPS from '../configs/feedr-apps';
import CookieManager from '../components/oauth/CookieManager';

/**
 * There is no node module for Reddit login, so use this callback with RedditConnect.jsx
 * and /proxy-server/index.js to retrieve an access_token.
 */
export const CallbackPage = props => {
  const params = useParams();

  useEffect(() => {
    /** Successful authorization returns an object with the form:
     * {
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
        .then(data => CookieManager.setUserToken(data, APPS.reddit.name))
        .then(props.history.push('/connect'));

      // TODO: Handle errors returned from the above fetch
    }
  });

  return <div>Redirecting, please wait...</div>;
};
