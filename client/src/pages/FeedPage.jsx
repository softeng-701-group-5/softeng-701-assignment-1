import React from 'react';
import {
  AppBar,
  Typography,
  Toolbar,
  Container,
  Grid,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';

import { MediaCard } from '../components/MediaCard';
import { getFeed } from '../common/api';

import ClipLoader from 'react-spinners/ClipLoader';

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
    display: 'flex',
  },
  card: {
    flex: 1,
  },
  homeButton: {
    marginRight: theme.spacing(2),
    color: '#FFFFFF',
  },
  load: {
    size: 9000,
    color: '#123abc',
  },
}));

export const FeedPage = () => {
  const classes = useStyles();

  // state management
  const [feed, setFeed] = React.useState([]);
  const [loader, setLoader] = React.useState(true);

  // fetches data when page loads
  React.useEffect(() => {
    // synchronous function as recommended by react
    getFeed()
      .then(data => setFeed(data))
      .then(() => setLoader(false))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <IconButton
              component={Link}
              to={'/'}
              color="inherit"
              className={classes.homeButton}
            >
              <HomeIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6">
              Feedr
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Container className={classes.container}>
        <Grid container spacing={3} justify="center">
          {<ClipLoader size={120} color={'#123abc'} loading={loader} />}
          {feed.map((item, i) => (
            <Grid item key={i} className={classes.item}>
              <MediaCard {...item} className={classes.card} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};
