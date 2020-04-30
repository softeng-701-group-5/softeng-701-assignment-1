import React from 'react';
import APPS from '../../configs/feedr-apps';
import CookieManager from './CookieManager';
import { useEffect } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

const github = APPS.github;

const useStyles = makeStyles(theme => ({
  button: {
    color: 'white',
    fontWeight: '600',
    backgroundColor: '#28a745',
    backgroundImage: 'linear-gradient(-180deg, #34d058, #28a745 90%)',
    border: '1px solid rgba(27, 31, 35, 0.2)',
    borderRadius: '.25em',
    height: 47,
  },
  github: {
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

export const GithubConnect = props => {
  const classes = useStyles();
  const cookie = CookieManager.getUserToken(github.name);

  const [isConnected, setConnected] = React.useState(
    cookie !== null && cookie !== undefined
  );

  useEffect(() => {
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

  const disconnectGithub = () => {
    CookieManager.removeUserToken(github.name);
    window.location.reload();
  };

  return (
    <div className={classes.github}>
      <Button
        className={classes.button}
        onClick={isConnected ? disconnectGithub : connectGithub}
        variant="contained"
      >
        {isConnected ? 'Disconnect Github' : 'Connect to Github'}
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
