import React from 'react';
import APPS from '../../configs/feedr-apps';
import CookieManager from './CookieManager';
import { Button, makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import classNames from 'classnames';

const reddit = APPS.reddit;

const useStyles = makeStyles(theme => ({
  button: {
    color: 'white',
    background: '#0079d3',
    fontWeight: '600',
    height: 47,
  },
  reddit: {
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

export const RedditConnect = props => {
  const classes = useStyles();
  const cookie = CookieManager.getUserToken(reddit.name);

  const [isConnected, setConnected] = React.useState(
    cookie !== null && cookie !== undefined
  );

  useEffect(() => {
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

  const disconnectReddit = () => {
    CookieManager.removeUserToken(reddit.name);
    window.location.reload();
  };

  return (
    <div className={classes.reddit}>
      <Button
        className={classes.button}
        onClick={isConnected ? disconnectReddit : connectReddit}
        variant="contained"
      >
        {isConnected ? 'Disconnect Reddit' : 'Connect to Reddit'}
      </Button>
      <CheckCircleRoundedIcon
        className={classNames(
          classes.checkIcon,
          isConnected ? classes.connected : classes.disconnected
        )}
      />
    </div>
  );
};
