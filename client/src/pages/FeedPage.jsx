import React from 'react';
import {
  AppBar,
  Typography,
  Toolbar,
  Container,
  Grid,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';

import { MediaCard } from '../components/MediaCard';
import { getFeed } from '../common/api';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f5f5f5',
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
}));

export const FeedPage = () => {
  const classes = useStyles();

  // TODO: remove once server supplies data
  const items = [
    {
      media: 'reddit',
      title: 'What was normal to have in 2010 but not 2020?',
      username: 'John Smith',
      mainText: 'Top comment: Cellphone with a physical keyboard.',
      imageLink:
        'https://images.techhive.com/images/article/2015/11/old_nokia_phones-100625503-large.jpg',
      avatarLink:
        'http://2.bp.blogspot.com/-8ms4E7aH4w8/UMztXOsniqI/AAAAAAAAIW0/qql0GcspDzs/s1600/2298.jpg',
      relativeTime: '10 mins ago',
      mediaSourceLink: '',
    },
    {
      media: 'twitter',
      title: 'Donald J. Trump',
      username: 'Donald Duck',
      mainText:
        'Hoping to get the payroll tax cut approved by both Republicans and Democrats, and please remember, very important for all countries & businesses to know that trade will in no way be affected by the 30-day restriction on travel from Europe. The restriction stops people not goods.',
      imageLink:
        'https://www.motherjones.com/wp-content/uploads/2020/03/trump-coronavirus-3-11-20.jpg?w=990',
      avatarLink:
        'http://2.bp.blogspot.com/-8ms4E7aH4w8/UMztXOsniqI/AAAAAAAAIW0/qql0GcspDzs/s1600/2298.jpg',
      relativeTime: '4 hours ago',
      mediaSourceLink: '',
    },
  ];

  // state management
  const [feed, setFeed] = React.useState(items);

  // fetches data when page loads
  React.useEffect(() => {
    // synchronous function as recommended by react
    getFeed()
      .then(data => setFeed(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className={classes.root}>
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
          </Toolbar>
        </Container>
      </AppBar>

      <Container className={classes.container}>
        <Grid container spacing={3} justify="center">
          {feed.map((item, i) => (
            <Grid item key={i} className={classes.item}>
              <MediaCard {...item} className={classes.card} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};
