import React from 'react';
import {
  AppBar,
  Container,
  Grid,
  IconButton,
  CircularProgress,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import { MediaCard } from '../components/MediaCard';
import { FilterBar } from '../components/FilterBar';
import { SearchBox } from '../components/SearchBox';
import { getFeed } from '../common/api';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f5f5f5',
  },
  title: {
    color: 'white',
  },
  appBar: {
    display: 'flex',
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
  appBarContents: {
    display: 'flex',
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
  logoutButton: {
    color: '#FFFFFF',
  },
  button: {
    colour: '#FFFFFF',
  },
  loader: {
    width: '100%',
    animationDuration: '550ms',
    marginTop: theme.spacing(2),
  },
}));

export const FeedPage = () => {
  const classes = useStyles();

  // state management
  const [feed, setFeed] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  const [filters, setFilters] = React.useState([
    'reddit',
    'hackernews',
    'github',
    'twitter',
  ]);
  const [search, setSearch] = React.useState([]);

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
        <Grid
          className={classes.appBar}
          alignItems={'center'}
          justify={'space-between'}
        >
          <div className={classes.appBarContents}>
            <Button
              className={classes.title}
              variant="h6"
              component={Link}
              to={'feed'}
            >
              Feedr
            </Button>
            <Button
              className={classes.title}
              variant="h6"
              component={Link}
              to={'favourites'}
            >
              Favourites
            </Button>
            <SearchBox setSearch={setSearch} />
          </div>
          <IconButton
            component={Link}
            to={'/'}
            color="inherit"
            className={classes.logoutButton}
          >
            <ExitToAppIcon />
          </IconButton>
        </Grid>
      </AppBar>

      {!loader && <FilterBar setFilters={setFilters} />}

      <Container className={classes.container}>
        <Grid container spacing={3} justify="center">
          {loader && (
            <CircularProgress className={classes.loader}></CircularProgress>
          )}
          {feed.map(
            (item, i) =>
              filters.includes(item.media) &&
              // Only checking the mainText if there is text to check, untherwise it will come up as 'undefined'
              (typeof item.mainText !== 'undefined'
                ? item.mainText.toLowerCase().includes(search) ||
                  item.username.toLowerCase().includes(search) ||
                  item.title.toLowerCase().includes(search)
                : item.username.toLowerCase().includes(search) ||
                  item.title.toLowerCase().includes(search)) && (
                <Grid item key={i} className={classes.item}>
                  <MediaCard {...item} className={classes.card} />
                </Grid>
              )
          )}
        </Grid>
      </Container>
    </div>
  );
};
