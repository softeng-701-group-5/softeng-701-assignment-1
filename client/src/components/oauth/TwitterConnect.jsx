import React from 'react';
import TwitterLogin from 'react-twitter-login';
import APPS from '../../configs/feedr-apps';

export const TwitterConnect = props => {
  const authHandler = (err, data) => {
    console.log(err, data);
  };

  return (
    <TwitterLogin
      authCallback={authHandler}
      consumerKey={APPS.twitter.clientId}
      consumerSecret={APPS.twitter.clientSecret}
      callbackUrl={APPS.twitter.redirectUrl}
    />
  );
};
