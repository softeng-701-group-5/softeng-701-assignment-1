import React from 'react';
import TwitterLogin from 'react-twitter-login';
import APPS from '../../configs/feedr-apps';
import CookieManager from './CookieManager';

const twitter = APPS.twitter;

export const TwitterConnect = props => {
  const cookie = CookieManager.getUserToken(twitter.name);

  const [isConnected, setConnected] = React.useState(
    cookie !== null && cookie !== undefined
  );

  /**
   * Successful authorization returns an object with the form:
    {
      "oauth_token": "0000000000000000000-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "oauth_token_secret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "user_id": "0000000000000000000",
      "screen_name": "Group205149975"
    }
  */
  const authHandler = (err, data) => {
    if (!err) {
      CookieManager.setUserToken(data, twitter.name);

      // TODO: Get/update data shown on feed
    } else {
      // TODO: Handle error
    }

    // Probably don't need to check so thoroughly
    const cookie = CookieManager.getUserToken(twitter.name);
    setConnected(cookie !== null && cookie !== undefined);
  };

  return !isConnected ? (
    <TwitterLogin
      authCallback={authHandler}
      consumerKey={twitter.clientId}
      consumerSecret={twitter.clientSecret}
      buttonTheme="light_short"
    />
  ) : (
    // TODO: Change this into a disconnect button
    <div>
      <h1>CONNECTED TO TWITTER!!!</h1>
      <h4>COOKIE = {CookieManager.getUserToken(twitter.name)}</h4>
    </div>
  );
};
