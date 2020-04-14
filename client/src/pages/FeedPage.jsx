import React from 'react';
import Masonry from 'react-masonry-component';
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
      <Header setLayout={setLayout} setSearch={setSearch} layout={layout} />
      {!loader && <FilterBar setFilters={setFilters} />}
      {loader && (
        <div className={classes.loaderContainer}>
          <CircularProgress className={classes.loader}></CircularProgress>
        </div>
      )}
      <Masonry>
        {feed.map(
          (item, i) =>
            filters.includes(item.media) &&
            isSearchedPost(search, item) && <MediaCard {...item} />
        )}
      </Masonry>
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
