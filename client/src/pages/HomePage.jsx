import React from 'react';
import { makeStyles, Container, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  containerItems: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonLogin: {
    color: 'green',
  },
}));

export const HomePage = () => {
  const classes = useStyles();

  return (
    <Container className={classes.containerItems}>
      <Button className={classes.buttonLogin}>Hello xd</Button>
    </Container>
  );
};
