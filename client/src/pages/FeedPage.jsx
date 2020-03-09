import React from 'react';
import { AppBar, Typography, Toolbar, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const FeedPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            Feedr
          </Typography>
        </Toolbar>
      </AppBar>
      <p>welcome to the feed page</p>
    </div>
  );
};
