import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Grid, CircularProgress, makeStyles } from '@material-ui/core';
import { MediaCard } from '../components/MediaCard';
import { FilterBar } from '../components/FilterBar';
import { Header } from '../components/Header';
import { getFeed } from '../common/api';

const useStyles = makeStyles(theme => ({
  root: {},
  feedContainer: {
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
  lightTheme: {
    backgroundColor: '#fff',
    color: '#333',
  },
  darkTheme: {
    backgroundColor: '#1a1919',
    color: '#999',
  },
}));

export const FeedPage = () => {
  const classes = useStyles();

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

  //theme management
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  // fetches data when page loads
  React.useEffect(() => {
    // synchronous function as recommended by react
    getFeed()
      .then(data => setFeed(data))
      .then(() => setLoader(false))
      .catch(error => console.error(error));
  }, []);

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
    <div className={theme === 'light' ? classes.lightTheme : classes.darkTheme}>
      <Header
        setLayout={setLayout}
        setSearch={setSearch}
        layout={layout}
        toggleTheme={toggleTheme}
      />
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
        <Grid
          className={classes.feedContainer}
          container
          direction={layout === 'grid' ? 'row' : 'column'}
          spacing={3}
          alignContent={'center'}
          justify="center"
        >
          {mappedFeed.map(
            (item, i) =>
              filters.includes(item.media) &&
              isSearchedPost(search, item) && (
                <Grid item key={i} className={classes.item}>
                  <MediaCard
                    {...item}
                    className={classes.card}
                    getTheme={theme}
                  />
                </Grid>
              )
          )}
        </Grid>
      </InfiniteScroll>
    </div>
  );
};

const isSearchedPost = (search, item) => {
  // Only checking the mainText if there is text to check, untherwise it will come up as 'undefined'
  return !!item.mainText
    ? item.mainText.toLowerCase().includes(search) ||
        item.username.toLowerCase().includes(search) ||
        item.title.toLowerCase().includes(search)
    : item.username.toLowerCase().includes(search) ||
        item.title.toLowerCase().includes(search);
};
