import React from 'react';
import TwitterLogin from 'react-twitter-login';
import APPS from '../../configs/feedr-apps';
import CookieManager from './CookieManager';
import { Button, makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

const twitter = APPS.twitter;

const useStyles = makeStyles(theme => ({
  button: {
    color: 'white',
    fontWeight: '600',
    width: 116,
    background: 'rgb(29, 161, 242)',
    height: 47,
  },
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
    } else {
      console.error();
    }

    const cookie = CookieManager.getUserToken(twitter.name);
    setConnected(cookie !== null && cookie !== undefined);
  };

  const disconnectTwitter = () => {
    CookieManager.removeUserToken(twitter.name);
    window.location.reload();
  };

  return (
    <div className={classes.twitter}>
      {!isConnected ? (
        <TwitterLogin
          authCallback={authHandler}
          consumerKey={twitter.clientId}
          consumerSecret={twitter.clientSecret}
          buttonTheme="dark_short"
        />
      ) : (
        <Button
          className={classes.button}
          onClick={disconnectTwitter}
          variant="contained"
          children={'Disconnect Twitter'}
        />
      )}
      <CheckCircleRoundedIcon
        className={classNames(
          classes.checkIcon,
          isConnected ? classes.connected : classes.disconnected
        )}
      />
    </div>
  );
};
