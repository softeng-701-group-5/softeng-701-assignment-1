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
        <Link to="/feed">
          <Button className={classes.loginButton} color="blue">
            <Typography>LOGIN</Typography>
          </Button>
        </Link>
      </Grid>
    </Paper>
  );
};
