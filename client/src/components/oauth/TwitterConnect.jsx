import React from 'react';
import TwitterLogin from 'react-twitter-login';
import APPS from '../../configs/feedr-apps';
import CookieManager from './CookieManager';
import { makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

const twitter = APPS.twitter;

const useStyles = makeStyles(theme => ({
  twitter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  checkIcon: {
    fontSize: '48px',
    marginTop: '10px',
  },
  connected: {
    color: '#00E500',
  },
  disconnected: {
    color: 'gray',
  },
}));

export const TwitterConnect = props => {
  const classes = useStyles();
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
      "screen_name": "xxxxxxxxxxxxxx"
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

  return (
    /*!isConnected ?*/ <div className={classes.twitter}>
      <TwitterLogin
        authCallback={authHandler}
        consumerKey={twitter.clientId}
        consumerSecret={twitter.clientSecret}
        buttonTheme="dark_short"
      />
      <CheckCircleRoundedIcon
        className={classNames(
          classes.checkIcon,
          isConnected ? classes.connected : classes.disconnected
        )}
      />
      {/* {CookieManager.getUserToken(twitter.name)} */}
    </div>
  );
};
