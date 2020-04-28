import React from 'react';
import APPS from '../../configs/feedr-apps';
import CookieManager from './CookieManager';
import { useEffect } from 'react';

const github = APPS.github;

export const GithubConnect = props => {
  const cookie = CookieManager.getUserToken(github.name);

  const [isConnected, setConnected] = React.useState(
    cookie !== null && cookie !== undefined
  );

  useEffect(() => {
    // TODO: Change this to actually work immediately after the user logs in (so that you don't need to refresh the page)
    const cookie = CookieManager.getUserToken(github.name);
    setConnected(cookie !== null && cookie !== undefined);
  }, []);

  const connectGithub = () => {
    const url = github.authUrl;
    const id = github.clientId;
    const redir = github.redirectUrl;
    const scope = github.scope;
    const state = (Math.random() + 1).toString(36).substring(7); // A random (5 character) string

    // Redirect to the GitHub login page
    window.location = `${url}?client_id=${id}&redirect_uri=${redir}&scope=${scope}&state=${state}`;
  };

  return !isConnected ? (
    <div>
      <button onClick={connectGithub}>LOGIN TO GITHUB</button>
    </div>
  ) : (
    // TODO: Change this into a disconnect button
    <div>
      <h1>CONNECTED TO GITHUB!!!</h1>
      <h4>COOKIE = {CookieManager.getUserToken(github.name)}</h4>
    </div>
  );
};
