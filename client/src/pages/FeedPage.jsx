import React from 'react';
import {
  AppBar,
  Container,
  Grid,
  IconButton,
  CircularProgress,
  Switch,
  Button,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AppsRoundedIcon from '@material-ui/icons/AppsRounded';
import ViewStreamRoundedIcon from '@material-ui/icons/ViewStreamRounded';
import { Link } from 'react-router-dom';
import { MediaCard } from '../components/MediaCard';
import { FilterBar } from '../components/FilterBar';
import { SearchBox } from '../components/SearchBox';
import { getFeed } from '../common/api';
import { useAuth } from '../context/AuthContext';

const useStyles = makeStyles(theme => ({
  lightTheme: {
    backgroundColor: '#fff',
    color: '#333',
  },
  darkTheme: {
    backgroundColor: '#1a1919',
    color: '#999',
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
  themeToggle: {
    marginLeft: '60vw',
  },
}));

export const FeedPage = () => {
  const classes = useStyles();
  const { signOut } = useAuth();

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
    <div className={theme === 'light' ? classes.lightTheme : classes.darkTheme}>
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
            <Typography className={classes.title} variant="h6">
              Feedr
            </Typography>
            <Switch className={classes.themeToggle} onChange={toggleTheme} />
          </div>
        </Grid>
      </AppBar>

      {!loader && <FilterBar setFilters={setFilters} />}

      <Container className={classes.container}>
        <Grid
          container
          direction={layout === 'grid' ? 'row' : 'column'}
          spacing={3}
          alignContent={'center'}
          justify="center"
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
