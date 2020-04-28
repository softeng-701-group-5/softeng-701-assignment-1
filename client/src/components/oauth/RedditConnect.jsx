import React from 'react';
import APPS from '../../configs/feedr-apps';
import CookieManager from './CookieManager';
import { Button, makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
// import qs from 'querystring';
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
  // const refreshReddit = () => {
  //   const cookie = CookieManager.getUserToken(reddit.name);
  //   const refreshToken = JSON.parse(cookie).refresh_token;

  //   fetch('/proxy/reddit/refresh', {
  //     method: 'POST',
  //     crossDomain: true,
  //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //     body: qs.stringify({ refresh_token: refreshToken }),
  //   })
  //     .then(resp => resp.json())
  //     .then(data => {
  //       data.expires_at = new Date(
  //         new Date().getTime() + data.expires_in * 1000
  //       );

  //       // Refreshing the access_token doesn't return the refresh_token (which is permanent) with it, so add it
  //       const newCookie = data;
  //       newCookie.refresh_token = refreshToken;

  //       CookieManager.setUserToken(newCookie, APPS.reddit.name);

  //       // Probably don't need to check so thoroughly
  //       const cookie = CookieManager.getUserToken(reddit.name);
  //       setConnected(cookie !== null && cookie !== undefined);
  //     });

  //   // TODO: Handle errors returned from the above fetch
  // };

  // TODO: Prevent the need for manually refreshing the page after successfull authorization to see the token
  // TODO: Can probably pass in props or something to fix the above TODO
  return (
    <div className={classes.reddit}>
      <Button
        className={classes.button}
        onClick={connectReddit}
        variant="contained"
      >
        {' '}
        {isConnected ? 'Disconnect Reddit' : 'Connect to Reddit'}
      </Button>
      <CheckCircleRoundedIcon
        className={classNames(
          classes.checkIcon,
          isConnected ? classes.connected : classes.disconnected
        )}
      />
      {/* CookieManager.getUserToken(reddit.name) */}
    </div>
  );
};
