import React from 'react';
import {
  AppBar,
  Typography,
  Toolbar,
  Container,
  Paper,
  Grid,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export const FeedPage = () => {
  const classes = useStyles();

  // TODO: fetch data from server
  const items = [
    'item 1',
    'item 2',
    'item 3',
    'item 4',
    'item 5',
    'item 6',
    'item 7',
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            Feedr
          </Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <Paper>
          <Grid container direction="column" spacing={3}>
            {items.map((item, i) => (
              <Grid item key={i}>
                <Paper>
                  <Typography>{item}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};
