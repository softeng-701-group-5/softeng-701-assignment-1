import React from 'react';
import { Button, Paper, makeStyles, Typography, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  loginButton: {
    backgroundColor: 'blue',
    color: 'black',
    padding: 20,
  },
}));

export const HomePage = () => {
  const classes = useStyles();

  return (
    <Paper>
      <Grid container>
        <Button component={Link} to="/feed" className={classes.loginButton}>
          <Typography>LOGIN</Typography>
        </Button>
      </Grid>
    </Paper>
  );
};
