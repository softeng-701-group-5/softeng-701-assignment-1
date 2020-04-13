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
import AppsRoundedIcon from '@material-ui/icons/AppsRounded';
import ViewStreamRoundedIcon from '@material-ui/icons/ViewStreamRounded';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import { MediaCard } from '../components/MediaCard';
import { FilterBar } from '../components/FilterBar';
import { SearchBox } from '../components/SearchBox';
import { getFeed } from '../common/api';
import { useAuth } from '../context/AuthContext';

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
  headerButtons: {
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
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
}));

export const FeedPage = () => {
  const classes = useStyles();
  const { signOut } = useAuth();

  // state management
  const [layout, setLayout] = React.useState('grid');
  const [feed, setFeed] = React.useState([]);
  const [mappedFeed] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [feedIndex, setFeedIndex] = React.useState(0);
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

  const handleClick = layoutSelected => {
    setLayout(layoutSelected);
  };

  const loadFeed = page => {
    const feedsPerLoad = 6;
    if (feed.length > feedIndex) {
      Array.prototype.push.apply(
        mappedFeed,
        feed.slice(feedIndex, feedIndex + feedsPerLoad)
      );
      setFeedIndex(feedIndex + feedsPerLoad);
    } else if (!loader) {
      setHasMore(false);
    }
  };

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
          <div className={classes.appBarContents}>
            <IconButton
              onClick={() => handleClick(layout === 'grid' ? 'row' : 'grid')}
              color="inherit"
              className={classes.headerButtons}
            >
              {layout === 'grid' ? (
                <ViewStreamRoundedIcon />
              ) : (
                <AppsRoundedIcon />
              )}
            </IconButton>
            <IconButton
              component={Link}
              to={'/'}
              color="inherit"
              className={classes.headerButtons}
              onClick={signOut}
            >
              <ExitToAppIcon />
            </IconButton>
          </div>
        </Grid>
      </AppBar>

      {!loader && <FilterBar setFilters={setFilters} />}

      <InfiniteScroll
        loadMore={loadFeed.bind(this)}
        hasMore={hasMore}
        loader={
          <div className={classes.loaderContainer}>
            <CircularProgress className={classes.loader}></CircularProgress>
          </div>
        }
      >
        <Container className={classes.container}>
          <Grid
            container
            direction={layout === 'grid' ? 'row' : 'column'}
            spacing={3}
            alignContent={'center'}
            justify="center"
          >
            {mappedFeed.map(
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
      </InfiniteScroll>
    </div>
  );
};
