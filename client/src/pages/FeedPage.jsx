import React from 'react';
import {
  AppBar,
  Typography,
  Toolbar,
  Container,
  Grid,
  makeStyles,
  IconButton,
  CircularProgress,
  Switch,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import { MediaCard } from '../components/MediaCard';
import { FilterBar } from '../components/FilterBar';
import { getFeed } from '../common/api';

const useStyles = makeStyles(theme => ({
  lightTheme: {
    backgroundColor: '#fff',
    color: '#333',
  },
  darkTheme: {
    backgroundColor: '#1a1919',
    color: '#999',
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
  loader: {
    width: '100%',
    animationDuration: '550ms',
    marginTop: theme.spacing(2),
  },
  themeToggle: {
    marginLeft: '70vw',
  },
}));

export const FeedPage = () => {
  const classes = useStyles();

  // theme toggle
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  // state management
  const [feed, setFeed] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  const [filters, setFilters] = React.useState([
    'reddit',
    'hackernews',
    'github',
    'twitter',
  ]);

  // fetches data when page loads
  React.useEffect(() => {
    // synchronous function as recommended by react
    getFeed()
      .then(data => setFeed(data))
      .then(() => setLoader(false))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className={theme === 'light' ? classes.lightTheme : classes.darkTheme}>
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
            <Switch className={classes.themeToggle} onChange={toggleTheme} />
          </Toolbar>
        </Container>
      </AppBar>

      {!loader && <FilterBar setFilters={setFilters} />}

      <Container className={classes.container}>
        <Grid container spacing={3} justify="center">
          {loader && (
            <CircularProgress className={classes.loader}></CircularProgress>
          )}
          {feed.map(
            (item, i) =>
              filters.includes(item.media) && (
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
      </Container>
    </div>
  );
};
