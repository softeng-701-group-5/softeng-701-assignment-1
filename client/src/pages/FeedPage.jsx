import React from 'react';
import StackGrid from 'react-stack-grid';
import { Waypoint } from 'react-waypoint';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { MediaCard } from '../components/MediaCard';
import { FilterBar } from '../components/FilterBar';
import { Header } from '../components/Header';
import { getFeed } from '../common/api';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f5f5f5',
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

  // state management
  const [layout, setLayout] = React.useState('grid');
  const [feed, setFeed] = React.useState([]);
  const [mappedFeed, setMappedFeed] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [feedIndex, setFeedIndex] = React.useState(0);
  const [filters, setFilters] = React.useState([
    'reddit',
    'hackernews',
    'github',
    'twitter',
  ]);
  const [filterInit, setFilterInit] = React.useState(false);
  const [search, setSearch] = React.useState([]);

  // fetches data when page loads
  React.useEffect(() => {
    // synchronous function as recommended by react
    getFeed()
      .then(data => {
        setFeed(data);
        setMappedFeed(data.slice(0, 25));
        setFeedIndex(25);
      })
      .then(() => setFilterInit(true))
      .catch(error => console.error(error));
  }, []);

  const loadFeed = () => {
    const feedsPerLoad = 12;
    if (feed.length > feedIndex) {
      Array.prototype.push.apply(
        mappedFeed,
        feed.slice(feedIndex, feedIndex + feedsPerLoad)
      );
      setFeedIndex(feedIndex + feedsPerLoad);
    } else if (feed.length !== 0) {
      setHasMore(false);
    }
  };

  return (
    <div className={classes.root}>
      <Header setLayout={setLayout} setSearch={setSearch} layout={layout} />
      {filterInit && <FilterBar setFilters={setFilters} />}
      <StackGrid
        columnWidth={300}
        gutterWidth={layout === 'grid' ? 20 : 300}
        gutterHeight={20}
      >
        {mappedFeed.map(
          (item, i) =>
            filters.includes(item.media) &&
            isSearchedPost(search, item) && <MediaCard {...item} />
        )}
      </StackGrid>
      <Waypoint
        onEnter={() => {
          setTimeout(() => loadFeed());
        }}
      />
      {hasMore && (
        <div className={classes.loaderContainer}>
          <CircularProgress className={classes.loader}></CircularProgress>
        </div>
      )}
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
