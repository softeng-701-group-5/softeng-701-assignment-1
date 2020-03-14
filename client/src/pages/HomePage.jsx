import React from 'react';
import {
  makeStyles,
  Container,
  Button,
  Paper,
  Typography,
  TextField,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: "url('public/bg.jpg')",
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

  return (
    <div className={classes.root}>
      <Container className={classes.containerItems}>
        <Paper elevation={3} className={classes.paperLayout}>
          <Typography className={classes.title} component="h3" variant="h2">
            Feedr
          </Typography>
          <TextField
            margin="normal"
            required
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            className={classes.textInput}
          />
          <TextField
            margin="normal"
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            className={classes.textInput}
          />
          <Button className={classes.buttonLogin} component={Link} to={'/feed'}>
            Login
          </Button>
        </Paper>
      </Container>
    </div>
  );
};
