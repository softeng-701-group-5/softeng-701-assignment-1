import React from 'react';
import StackGrid from 'react-stack-grid';
import { Waypoint } from 'react-waypoint';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { MediaCard } from '../components/MediaCard';
import { FilterBar } from '../components/FilterBar';
import { Header } from '../components/Header';
import { getFeed } from '../common/api';
import classNames from 'classnames';

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
  const [mappedFeed, setMappedFeed] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [filters, setFilters] = React.useState([
    'reddit',
    'hackernews',
    'github',
    'twitter',
  ]);
  const [filterInit, setFilterInit] = React.useState(false);
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
  const feedsPerLoad = 20;

  // fetches data when page loads
  React.useEffect(() => {
    // synchronous function as recommended by react
    getFeed()
      .then(data => setFeed(data))
      .then(() => setFilterInit(true))
      .catch(error => console.error(error));
  }, []);

  React.useEffect(() => {
    let timer = setInterval(() => {
      if (document.body.scrollHeight > window.screen.height) {
        clearInterval(timer);
      }
      setMappedFeed(prevMap => [
        ...prevMap,
        ...feed.slice(prevMap.length, prevMap.length + feedsPerLoad),
      ]);
    }, 1500);
  }, [feed]);

  const onEnter = () => {
    setMappedFeed(prevMap => [
      ...prevMap,
      ...feed.slice(prevMap.length, prevMap.length + feedsPerLoad),
    ]);
    if (mappedFeed.length >= feed.length && feed.length !== 0) {
      setHasMore(false);
    }
  };

  return (
    <div
      className={classNames(
        classes.root,
        theme === 'light' ? classes.lightTheme : classes.darkTheme
      )}
    >
      <Header
        setLayout={setLayout}
        setSearch={setSearch}
        layout={layout}
        toggleTheme={toggleTheme}
        getTheme={theme}
      />
      {filterInit && <FilterBar setFilters={setFilters} />}
      <StackGrid
        columnWidth={300}
        gutterWidth={layout === 'grid' ? 20 : 300}
        gutterHeight={20}
      >
        {mappedFeed.map(
          (item, i) =>
            filters.includes(item.media) &&
            isSearchedPost(search, item) && (
              <MediaCard {...item} getTheme={theme} />
            )
        )}
      </StackGrid>
      <Waypoint onEnter={onEnter} />
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
