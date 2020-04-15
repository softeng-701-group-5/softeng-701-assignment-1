import React from 'react';
import APPS from '../../configs/feedr-apps';
import CookieManager from './CookieManager';
import { useEffect } from 'react';

const reddit = APPS.reddit;

export const RedditConnect = props => {
  const cookie = CookieManager.getUserToken(reddit.name);

  const [isConnected, setConnected] = React.useState(
    cookie !== null && cookie !== undefined
  );

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

  useEffect(() => {
    // TODO: Change this to actually work
    const cookie = CookieManager.getUserToken(reddit.name);
    setConnected(cookie !== null && cookie !== undefined);
  }, []);

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
    </div>
  );
};
