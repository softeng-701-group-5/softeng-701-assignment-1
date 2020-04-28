import React from 'react';
import APPS from '../../configs/feedr-apps';
import CookieManager from './CookieManager';
import { useEffect } from 'react';
import qs from 'querystring';

const reddit = APPS.reddit;

export const RedditConnect = props => {
  const cookie = CookieManager.getUserToken(reddit.name);

  const [isConnected, setConnected] = React.useState(
    cookie !== null && cookie !== undefined
  );

  useEffect(() => {
    // TODO: Change this to actually work immediately after the user logs in (so that you don't need to refresh the page)
    const cookie = CookieManager.getUserToken(reddit.name);
    setConnected(cookie !== null && cookie !== undefined);
  }, []);

  const connectReddit = () => {
    const url = reddit.authUrl;
    const id = reddit.clientId;
    const type = 'code';
    const state = (Math.random() + 1).toString(36).substring(7); // A random (5 character) string
    const redir = reddit.redirectUrl;
    const dur = 'permanent';
    const scope = 'read';

    // Redirect to the Reddit login page
    window.location = `${url}?client_id=${id}&response_type=${type}&state=${state}&redirect_uri=${redir}&duration=${dur}&scope=${scope}`;
  };

  // TODO: Whenver using the access token, first check the expires_at key of the cookie and refresh if needed
  const refreshReddit = () => {
    const cookie = CookieManager.getUserToken(reddit.name);
    const refreshToken = JSON.parse(cookie).refresh_token;

    fetch('/proxy/reddit/refresh', {
      method: 'POST',
      crossDomain: true,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: qs.stringify({ refresh_token: refreshToken }),
    })
      .then(resp => resp.json())
      .then(data => {
        data.expires_at = new Date(
          new Date().getTime() + data.expires_in * 1000
        );

        // Refreshing the access_token doesn't return the refresh_token (which is permanent) with it, so add it
        const newCookie = data;
        newCookie.refresh_token = refreshToken;

        CookieManager.setUserToken(newCookie, APPS.reddit.name);

        // Probably don't need to check so thoroughly
        const cookie = CookieManager.getUserToken(reddit.name);
        setConnected(cookie !== null && cookie !== undefined);
      });

    // TODO: Handle errors returned from the above fetch
  };

  // TODO: Prevent the need for manually refreshing the page after successfull authorization to see the token
  // TODO: Can probably pass in props or something to fix the above TODO
  return !isConnected ? (
    <div>
      <button onClick={connectReddit}>LOGIN TO REDDIT</button>
    </div>
  ) : (
    // TODO: Change this into a disconnect button
    <div>
      <h1>CONNECTED TO REDDIT!!!</h1>
      <h4>COOKIE = {CookieManager.getUserToken(reddit.name)}</h4>
      <button onClick={refreshReddit}>TEST REDDIT REFRESH</button>
    </div>
  );
};
