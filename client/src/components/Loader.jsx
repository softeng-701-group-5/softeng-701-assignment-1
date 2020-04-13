import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const Loader = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <CircularProgress size={200} />
    </div>
  );
};
