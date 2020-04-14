import React from 'react';
import GitHubLogin from 'react-github-login';
import APPS from '../../configs/feedr-apps';
import CookieManager from './CookieManager';

const github = APPS.github;

export const GithubConnect = props => {
  const cookie = CookieManager.getUserToken(github.name);

  const [isConnected, setConnected] = React.useState(
    cookie !== null && cookie !== undefined
  );
  /**
   * Successful authorization returns an object with the form:
  {
    code: "5cae4ba1139e6f33d2f6"
  }
   */
  const successHandler = data => {
    CookieManager.setUserToken(data, github.name);

    // Probably don't need to check so thoroughly
    const cookie = CookieManager.getUserToken(github.name);
    setConnected(cookie !== null && cookie !== undefined);

    // TODO: Get/update data shown on feed
  };

  const failureHandler = data => {
    // TODO: Handle failure
    console.log(data);
  };

  return !isConnected ? (
    <GitHubLogin
      clientId={github.clientId}
      redirectUri={github.redirectUrl}
      onSuccess={successHandler}
      onFailure={failureHandler}
    />
  ) : (
    // TODO: Change this into a disconnect button
    <h1>CONNECTED TO GITHUB!!!</h1>
  );
};
