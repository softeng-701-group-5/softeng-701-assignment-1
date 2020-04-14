import React from 'react';
import GitHubLogin from 'react-github-login';
import APPS from '../../configs/feedr-apps';

export const GithubConnect = props => {
  const authHandler = data => {
    console.log(data);
  };

  return (
    <GitHubLogin
      clientId={APPS.github.clientId}
      redirectUri={APPS.github.redirectUrl}
      onSuccess={authHandler}
      onFailure={authHandler}
    />
  );
};
