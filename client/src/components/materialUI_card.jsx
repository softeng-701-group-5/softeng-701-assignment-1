import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import TwitterIcon from './../assets/twitter-icon.svg';
import SpotifyIcon from './../assets/spotify-icon.svg';
import GithubIcon from './../assets/github-icon.svg';
import RedditIcon from './../assets/reddit-icon.svg';

const useStyles = makeStyles(theme => ({
  root: {
        maxWidth: 345,
        padding: 0,
        margin: 0, 
        border: 0,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
    },
}));

export default function MediaCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  
  /* colours and logos: 
  * reddit:  #FF4500 https://redditupvoted.files.wordpress.com/2015/10/reddit_icon_twitter_fb.png
  * spotify: #23D05F https://pbs.twimg.com/profile_images/558366562424332288/8ObpK74F.png
  * github:  #010101 https://avatars0.githubusercontent.com/u/9919?s=280&v=4
  * twitter: #05ACF0 https://pmcdeadline2.files.wordpress.com/2016/09/twitter-logo.jpg
  */
    const barColour = (param) => {
    switch (param) {
    case "reddit":
      return "#FF4500";
    case "spotify":
      return "#23D05F";
    case "github":
      return "#010101";
    case "twitter":
      return "#05ACF0"; // #00acee
    default:
      return "#b3b3b3";
  }
}

const mediaIcon = (param) => {
  switch (param) {
    case "reddit":
      return RedditIcon;
    case "spotify":
      return SpotifyIcon;
    case "github":
      return GithubIcon;
    case "twitter":
      return TwitterIcon;
    default:
      return "";
  }
}

  return (
    <Card className={classes.root} style={{padding:"0", margin:"0", border:"0"}}>
      <CardHeader 
            //avatar={
            //{
            //    //props.user_icon ?
            //    props.avatar_link ?
            //        <Avatar alt="Remy Sharp" src={props.user_icon} className={classes.large} style={{ float: "left", margin: "0.6em" }} /> :
            //        <Avatar alt="Remy Sharp" src="https://img.icons8.com/windows/64/000000/user.png" style={{ background: "#b3b3b3", float: "left", margin: "0.1em" }} className={classes.large} />
            //}
            //}
              avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                      R
          </Avatar>
              }

              action={
                  <IconButton aria-label="settings">
                      <MoreVertIcon />
                  </IconButton>
              }
              title={props.title}
              subheader={props.relative_time}
      />
      <CardMedia
              className={classes.media}
              image={props.image_link}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
             {props.main_text}
        </Typography>
      </CardContent>
          {/* TODO change the background colour call to a function call */}
          <CardActions style={{ backgroundColor: barColour(props.media)}} disableSpacing >
              <img src={mediaIcon(props.media)} />
              
      </CardActions>
    </Card>
  );
}