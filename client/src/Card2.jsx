import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import TwitterIcon from './assets/twitter-icon.svg';
import SpotifyIcon from './assets/spotify-icon.svg';
import GithubIcon from './assets/github-icon.svg';
import RedditIcon from './assets/reddit-icon.svg';

const useStyles = makeStyles(theme => ({
  root: {
        maxWidth: 345,
        padding: 0,
        margin: 0, 
        border: 0,
        backgroundColor: "green",
        // border-bottom: '5px solid red',
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

export default function RecipeReviewCard() {
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
      return "#05ACF0";
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
      <CardHeader style={{backgroundColor:"white"}}
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
              title="Title"
              subheader="5 min ago"
              //style={{border-bottom: '5px solid red'}}
      />
      <CardMedia
        className={classes.media}
              image="https://cdn.mos.cms.futurecdn.net/ntFmJUZ8tw3ULD3tkBaAtf.jpg"
        title="Paella dish"
      />
      <CardContent style={{backgroundColor:"white"}}>
        <Typography variant="body2" color="textSecondary" component="p">
          Main text
        </Typography>
      </CardContent>
      <CardActions style={{backgroundColor:"red"}} disableSpacing >
        <img src={mediaIcon("twitter")}/>
      </CardActions>
      {/* <div style={{backgroundColor:"green", padding:"0", margin:"0", border:"0"}}><p>sdfg</p></div> */}
    </Card>
  );
}