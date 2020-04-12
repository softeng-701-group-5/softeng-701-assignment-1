import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  makeStyles,
} from '@material-ui/core';

import TwitterIcon from '../assets/twitter-icon.svg';
import GithubIcon from '../assets/github-icon.svg';
import RedditIcon from '../assets/reddit-icon.svg';
import HackerNewsIcon from '../assets/hackernews-icon.svg';
import classNames from 'classnames';

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
    padding: 0,
    margin: 0,
    border: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  lightTheme: {
    backgroundColor: '#E2E2E2',
    color: '#363537',
  },
  darkTheme: {
    backgroundColor: '#363537',
    color: '#FAFAFA',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: '#c9c7c7',
  },
}));

const truncateString = (str, num) => {
  if (!str || str.length <= num) {
    return str;
  }

  return str.slice(0, num) + '...';
};

export const MediaCard = props => {
  const classes = useStyles();
  /* Alters colour bar based on which media is passed in
   * colours and logos:
   * reddit:  #FF4500 https://redditupvoted.files.wordpress.com/2015/10/reddit_icon_twitter_fb.png
   * spotify: #23D05F https://pbs.twimg.com/profile_images/558366562424332288/8ObpK74F.png
   * github:  #010101 https://avatars0.githubusercontent.com/u/9919?s=280&v=4
   * twitter: #05ACF0 https://pmcdeadline2.files.wordpress.com/2016/09/twitter-logo.jpg
   */
  const barColour = param => {
    switch (param) {
      case 'reddit':
        return '#FF4500';
      case 'hackernews':
        return '#FF6D00';
      case 'github':
        return '#010101';
      case 'twitter':
        return '#05ACF0';
      default:
        return '#b3b3b3';
    }
  };

  const mediaIcon = param => {
    switch (param) {
      case 'reddit':
        return RedditIcon;
      case 'hackernews':
        return HackerNewsIcon;
      case 'github':
        return GithubIcon;
      case 'twitter':
        return TwitterIcon;
      default:
        return '';
    }
  };

  return (
    <Card
      className={classNames(
        classes.root,
        props.getTheme === 'light' ? classes.lightTheme : classes.darkTheme
      )}
    >
      <CardHeader
        avatar={
          <Avatar
            alt={props.username}
            src={
              props.avatarLink ||
              'https://img.icons8.com/windows/64/000000/user.png'
            }
            className={classes.avatar}
          />
        }
        title={props.title}
        subheader={
          <Typography
            variant={'subtitle2'}
          >{`${props.username} - ${props.relativeTime}`}</Typography>
        }
      />

      {props.imageLink && (
        <CardMedia className={classes.media} image={props.imageLink} />
      )}

      <CardContent
        className={
          props.getTheme === 'light' ? classes.lightTheme : classes.darkTheme
        }
      >
        <Typography variant="body2" component="p">
          {truncateString(props.mainText, 200)}
        </Typography>
      </CardContent>

      <CardActions
        style={{ backgroundColor: barColour(props.media) }}
        disableSpacing
      >
        <img
          src={mediaIcon(props.media)}
          alt={`${props.media} logo`}
          height="20px"
        />
      </CardActions>
    </Card>
  );
};
