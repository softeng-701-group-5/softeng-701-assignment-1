import React from 'react';
import {
  AppBar,
  Typography,
  Toolbar,
  Container,
  Paper,
  Grid,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';

import { MediaCard } from '../components/MediaCard';

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
    textAlign: 'center',
  },
  homeButton: {
    marginRight: theme.spacing(2),
    color: '#FFFFFF',
  },
}));

export const FeedPage = () => {
  const classes = useStyles();

  // TODO: fetch data from server
  const items = [
    'item 1',
    'item 2',
    'item 3',
    'item 4',
    'item 5',
    'item 6',
    'item 7',
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static">
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
      </AppBar>

      <Container className={classes.container}>
        <Paper square className={classes.paperContainer}>
          <Grid container direction="column" spacing={3}>
            {items.map((item, i) => (
              <Grid item key={i} className={classes.item}>
                <Paper square>
                  <Typography>{item}</Typography>
                  <MediaCard
                    media="reddit"
                    title="What was normal to have in 2010 but not 2020?"
                    username="John Smith"
                    mainText="Top comment: Cellphone with a physical keyboard."
                    imageLink="https://images.techhive.com/images/article/2015/11/old_nokia_phones-100625503-large.jpg"
                    avatarLink="http://2.bp.blogspot.com/-8ms4E7aH4w8/UMztXOsniqI/AAAAAAAAIW0/qql0GcspDzs/s1600/2298.jpg"
                    relativeTime="10 mins ago"
                    mediaSourceLink=""
                  />
                  <MediaCard
                    media="twitter"
                    title="Donald J. Trump"
                    username="Donald Duck"
                    mainText="Hoping to get the payroll tax cut approved by both Republicans and Democrats, and please remember, very important for all countries & businesses to know that trade will in no way be affected by the 30-day restriction on travel from Europe. The restriction stops people not goods."
                    imageLink="https://www.motherjones.com/wp-content/uploads/2020/03/trump-coronavirus-3-11-20.jpg?w=990"
                    avatarLink="http://2.bp.blogspot.com/-8ms4E7aH4w8/UMztXOsniqI/AAAAAAAAIW0/qql0GcspDzs/s1600/2298.jpg"
                    relativeTime="4 hours ago"
                    mediaSourceLink=""
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};
