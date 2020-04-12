import React from 'react';
import {
  makeStyles,
  Container,
  Button,
  Paper,
  Typography,
} from '@material-ui/core';
import BackgroundImage from '../assets/bg-4k-min.jpg';
import { useAuth } from '../context/AuthContext';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${BackgroundImage})`,
    background: '#F5F5F5',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  containerItems: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paperLayout: {
    width: '50%',
    margin: '15%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
  },
  buttonLogin: {
    margin: '5%',
  },
  textInput: {
    width: '75%',
  },
  title: {
    margin: '5%',
  },
}));

export const HomePage = () => {
  const classes = useStyles();
  const { signIn } = useAuth();
  return (
    <div className={classes.root}>
      <Container className={classes.containerItems}>
        <Paper elevation={3} className={classes.paperLayout}>
          <Typography className={classes.title} component="h3" variant="h2">
            Feedr
          </Typography>
          <Button
            className={classes.buttonLogin}
            onClick={signIn}
            variant="contained"
            color="primary"
          >
            Sign in with Google
          </Button>
        </Paper>
      </Container>
    </div>
  );
};
