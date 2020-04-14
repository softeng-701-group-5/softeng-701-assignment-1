import React from 'react';
import { Grid, CircularProgress, makeStyles } from '@material-ui/core';
import { MediaCard } from '../components/MediaCard';
import { FilterBar } from '../components/FilterBar';
import { Header } from '../components/Header';

import { getFeed } from '../common/api';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f5f5f5',
  },
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
}));

export const FavouritesPage = () => {
  const classes = useStyles();

  // state management
  const [layout, setLayout] = React.useState('grid');
  const [loader, setLoader] = React.useState(true);
  const [feed, setFeed] = React.useState([]);
  const [filters, setFilters] = React.useState([
    'reddit',
    'hackernews',
    'github',
    'twitter',
  ]);
  const [search, setSearch] = React.useState([]);
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
      <Grid
        className={classes.container}
        container
        direction={layout === 'grid' ? 'row' : 'column'}
        spacing={3}
        justify="center"
        alignContent={'center'}
      >
        {loader && (
          <CircularProgress className={classes.loader}></CircularProgress>
        )}
        {feed.map(
          (item, i) =>
            filters.includes(item.media) &&
            isSearchedPost(search, item) && (
              <Grid item key={i} className={classes.item}>
                <MediaCard {...item} className={classes.card} />
              </Grid>
            )
        )}
      </Grid>
    </div>
  );
};

function isSearchedPost(search, item) {
  // Only checking the mainText if there is text to check, untherwise it will come up as 'undefined'
  return !!item.mainText
    ? item.mainText.toLowerCase().includes(search) ||
        item.username.toLowerCase().includes(search) ||
        item.title.toLowerCase().includes(search)
    : item.username.toLowerCase().includes(search) ||
        item.title.toLowerCase().includes(search);
}
