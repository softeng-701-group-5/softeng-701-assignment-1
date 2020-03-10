import React from 'react';
import {
  AppBar,
  Typography,
  Toolbar,
  Container,
  Paper,
  Grid,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f5f5f5',
  },
  container: {
    marginTop: 30,
  },
  paperContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  item: {
    textAlign: 'center',
  },
  homeButton: {
    marginRight: theme.spacing(2),
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
        <Toolbar variant="dense">
          <IconButton
            component={Link}
            to={'/'}
            color="white"
            className={classes.homeButton}
          >
            <HomeIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6">
            Feedr
          </Typography>
        </Toolbar>
      </AppBar>

      <Container className={classes.container}>
        <Paper square className={classes.paperContainer}>
          <Grid container direction="column" spacing={3}>
            {items.map((item, i) => (
              <Grid item key={i} className={classes.item}>
                <Paper square>
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
