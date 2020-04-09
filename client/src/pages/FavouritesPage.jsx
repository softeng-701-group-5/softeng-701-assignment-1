import React from 'react';
import {
  AppBar,
  Container,
  Grid,
  makeStyles,
  IconButton,
  CircularProgress,
  Button,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AppsRoundedIcon from '@material-ui/icons/AppsRounded';
import ViewStreamRoundedIcon from '@material-ui/icons/ViewStreamRounded';

import { Link } from 'react-router-dom';
import { MediaCard } from '../components/MediaCard';
import { FilterBar } from '../components/FilterBar';
import { SearchBox } from '../components/SearchBox';
import { getFeed } from '../common/api';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f5f5f5',
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
    color: '#FFFFFF',
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

  const handleClick = layoutSelected => {
    setLayout(layoutSelected);
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
              className={classes.button}
              variant="h6"
              component={Link}
              to={'feed'}
            >
              Feedr
            </Button>
            <Button
              className={classes.button}
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
                <AppsRoundedIcon />
              ) : (
                <ViewStreamRoundedIcon />
              )}
            </IconButton>
            <IconButton
              component={Link}
              to={'/'}
              color="inherit"
              className={classes.headerButtons}
            >
              <ExitToAppIcon />
            </IconButton>
          </div>
        </Grid>
      </AppBar>

      {!loader && <FilterBar setFilters={setFilters} />}

      <Container className={classes.container}>
        <Grid
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
