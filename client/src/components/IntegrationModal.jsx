import React from 'react';
import {
  Button,
  Modal,
  Backdrop,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { userApi } from '../common/api';
import { useAuth } from '../context/AuthContext';
import { Icon } from '@material-ui/core';
import classNames from 'classnames';
import { RedditConnect, GithubConnect, TwitterConnect } from './oauth';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
  },
  paper: {
    width: 720,
    height: 600,
    outline: 'none',
    borderRadius: 5,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    fontWeight: 'bold',
    color: 'white',
  },
  modalContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: '5%',
  },
  integrationContent: {
    display: 'flex',
    flexDirection: 'column',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  integrations: {
    fontSize: 72,
    marginBottom: 10,
  },
  gitHub: {
    color: '#24292e',
  },
  twitter: {
    color: '#00acee',
  },
  reddit: {
    color: '#FF5700',
  },
  saveChanges: {
    marginBottom: '10%',
    color: 'white',
  },
}));

export const IntegrationModal = props => {
  const { googleUser } = useAuth();

  const classes = useStyles();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleOnClick = React.useCallback(async () => {
    const { googleId } = googleUser?.profileObj;
    const response = await userApi.getToken(googleId);
    console.log(response);
    props.handleCloseAuth();
  });

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.open}
      disableAutoFocus={true}
      onBackdropClick={props.handleCloseAuth}
      onClose={props.handleCloseAuth}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div
        className={classes.paper}
        style={{
          backgroundColor: props.theme === 'light' ? '#fff' : '#1a1919',
          color: props.theme === 'light' ? '#333' : '#999',
        }}
      >
        <div
          className={classes.modalHeader}
          style={{
            backgroundColor: props.theme === 'light' ? '#3d3fb3' : '#2e3b55',
          }}
        >
          <Typography variant="h6"> Feedr Integration Center </Typography>
        </div>
        <Typography className={classes.message} variant="body1">
          Use this Integration Center to connect your social media with Feedr
        </Typography>
        <div className={classes.modalContent}>
          <div className={classes.integrationContent}>
            <Icon
              className={classNames(
                'fab fa-reddit',
                classes.reddit,
                classes.integrations
              )}
            />
            <RedditConnect />
          </div>
          <div className={classes.integrationContent}>
            <Icon
              className={classNames(
                'fab fa-twitter',
                classes.twitter,
                classes.integrations
              )}
            />
            <TwitterConnect />
          </div>
          <div className={classes.integrationContent}>
            <Icon
              className={classNames(
                'fab fa-github',
                classes.gitHub,
                classes.integrations
              )}
            />
            <GithubConnect />
          </div>
        </div>
        <Button
          style={{
            backgroundColor: props.theme === 'light' ? '#3d3fb3' : '#2e3b55',
          }}
          className={classes.saveChanges}
          variant="contained"
          size={'large'}
          onClick={handleOnClick}
        >
          Save Changes
        </Button>
      </div>
    </Modal>
  );
};
