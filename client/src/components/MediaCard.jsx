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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';

import { FeedrModal } from './FeedrModal';

import TwitterIcon from '../assets/twitter-icon.svg';
import GithubIcon from '../assets/github-icon.svg';
import RedditIcon from '../assets/reddit-icon.svg';
import HackerNewsIcon from '../assets/hackernews-icon.svg';
import WeatherIcon from '../assets/weather-icon.ico';
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

  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  weatherCard: {
    display: 'flex',
  },
  weatherContent: {
    marginTop: 5,
  },
  icon: {
    height: '100px',
    width: '100px',
    margin: 0,
  },
  avatar: {
    backgroundColor: '#c9c7c7',
  },
  lightTheme: {
    backgroundColor: '#E2E2E2',
    color: '#363537',
  },
  darkTheme: {
    backgroundColor: '#363537',
    color: '#FAFAFA',
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

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
      case 'weather':
        return '#4e4d4a';
      case 'covidNineteen':
        return '#B22222';
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
      case 'weather':
        return WeatherIcon;
      default:
        return '';
    }
  };

  const WeatherTable = param => {
    return (
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            <TableRow key="minTemp">
              <TableCell component="th" scope="row">
                Minimum temperature
              </TableCell>
              <TableCell align="right">{param.minTemp}</TableCell>
            </TableRow>
            <TableRow key="maxTemp">
              <TableCell component="th" scope="row">
                Maximum temperature
              </TableCell>
              <TableCell align="right">{param.maxTemp}</TableCell>
            </TableRow>
            <TableRow key="wind">
              <TableCell component="th" scope="row">
                Wind
              </TableCell>
              <TableCell align="right">
                {param.windSpeed} m/s ({props.windDeg})
              </TableCell>
            </TableRow>
            <TableRow key="pressure">
              <TableCell component="th" scope="row">
                Pressure
              </TableCell>
              <TableCell align="right">{param.pressure} hpa</TableCell>
            </TableRow>
            <TableRow key="humidity">
              <TableCell component="th" scope="row">
                Humidity
              </TableCell>
              <TableCell align="right">{param.humidity} %</TableCell>
            </TableRow>
            <TableRow key="sunrise">
              <TableCell component="th" scope="row">
                Sunrise
              </TableCell>
              <TableCell align="right">
                {new Date(param.sunrise * 1000).toLocaleTimeString()}
              </TableCell>
            </TableRow>
            <TableRow key="sunset">
              <TableCell component="th" scope="row">
                Sunset
              </TableCell>
              <TableCell align="right">
                {new Date(param.sunset * 1000).toLocaleTimeString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const FeedModalRender = () => {
    switch (props.media) {
      case 'weather':
        return (
          <FeedrModal
            open={open}
            handleClose={handleClose}
            barColour={barColour}
            mediaIcon={mediaIcon}
            media={props.media}
            title={'Current weather in Auckland, NZ'}
            mainText={
              <div>
                <div className={classes.weatherCard}>
                  {props.imageLink && (
                    <CardMedia
                      className={classes.icon}
                      image={props.imageLink}
                      title={props.weather}
                    />
                  )}
                  <CardContent className={classes.weatherContent}>
                    <Typography variant="h4" component="h4">
                      {Math.round(props.temperature)}&deg;C
                    </Typography>
                    <Typography variant="body2" component="p">
                      {props.mainText}
                    </Typography>
                  </CardContent>
                </div>
                {WeatherTable(props)}
              </div>
            }
            username={'OpenWeatherMapAPI'}
            relativeTime={props.relativeTime}
            getTheme={props.getTheme}
          />
        );
      default:
        return (
          <FeedrModal
            open={open}
            handleClose={handleClose}
            barColour={barColour}
            mediaIcon={mediaIcon}
            media={props.media}
            title={props.title}
            mainText={props.mainText}
            username={props.username}
            relativeTime={props.relativeTime}
            getTheme={props.getTheme}
          />
        );
    }
  };

  if (props.media === 'weather') {
    return (
      <div>
        <Card
          className={classNames(
            classes.root,
            props.getTheme === 'light' ? classes.lightTheme : classes.darkTheme
          )}
          onClick={handleOpen}
        >
          <CardHeader
            title="Current weather"
            subheader={
              <Typography variant={'subtitle2'}>
                {`${'in Auckland, NZ'} - ${'Now'}`}
              </Typography>
            }
          />

          <div className={classes.weatherCard}>
            {props.imageLink && (
              <CardMedia
                className={classes.icon}
                image={props.imageLink}
                title={props.weather}
              />
            )}
            <CardContent className={classes.weatherContent}>
              <Typography variant="h4" component="h4">
                {Math.round(props.temperature)}&deg;C
              </Typography>
              <Typography variant="body2" component="p">
                {props.mainText}
              </Typography>
            </CardContent>
          </div>

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

        <FeedModalRender />
      </div>
    );
  } else if (props.media === 'covidNineteen') {
    return (
      <div position="fixed" top={0} left={0}>
        <Card
          className={classNames(
            classes.root,
            props.getTheme === 'light' ? classes.lightTheme : classes.darkTheme
          )}
        >
          <CardHeader
            avatar={
              <Avatar
                src={
                  'https://img.icons8.com/emoji/48/000000/exclamation-mark-emoji.png'
                }
                className={classes.avatar}
              />
            }
            title={'COVID19 UPDATE'}
          />

          <CardContent>
            <Typography variant="body2" component="p">
              {'New Confirmed Cases: ' + props.newConfirmed}
            </Typography>
            <Typography variant="body2" component="p">
              {'New Probable Cases: ' + props.newProbable}
            </Typography>
            <Typography variant="body2" component="p">
              {'New Hospitalised: ' + props.newHospitalised}
            </Typography>
            <Typography variant="body2" component="p">
              {'New Recovered: ' + props.newRecovered}
            </Typography>
            <Typography variant="body2" component="p">
              {'New Deaths: ' + props.newDeaths}
            </Typography>
            <Typography variant="body2" component="p">
              {'------------    '}
            </Typography>
            <Typography variant="body2" component="p">
              {'Total Confirmed Cases: ' + props.totalConfirmed}
            </Typography>
            <Typography variant="body2" component="p">
              {'Total Probable Cases: ' + props.totalProbable}
            </Typography>
            <Typography variant="body2" component="p">
              {'Total Hospitalised: ' + props.totalHospitalised}
            </Typography>
            <Typography variant="body2" component="p">
              {'Total Recovered: ' + props.totalRecovered}
            </Typography>
            <Typography variant="body2" component="p">
              {'Total Deaths: ' + props.totalDeaths}
            </Typography>
          </CardContent>

          <CardActions
            style={{ backgroundColor: barColour(props.media) }}
            disableSpacing
          ></CardActions>
        </Card>
      </div>
    );
  } else {
    return (
      <div>
        <Card
          className={classNames(
            classes.root,
            props.getTheme === 'light' ? classes.lightTheme : classes.darkTheme
          )}
          onClick={handleOpen}
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

          <CardContent>
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

        <FeedModalRender />
      </div>
    );
  }
};
