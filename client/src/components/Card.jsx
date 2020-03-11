import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TwitterIcon from '../assets/twitter-icon.svg';
import SpotifyIcon from '../assets/spotify-icon.svg';
import GithubIcon from '../assets/github-icon.svg';
import RedditIcon from '../assets/reddit-icon.svg';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

/* colours and logos: 
 * reddit:  #FF4500 https://redditupvoted.files.wordpress.com/2015/10/reddit_icon_twitter_fb.png
 * spotify: #23D05F https://pbs.twimg.com/profile_images/558366562424332288/8ObpK74F.png
 * github:  #010101 https://avatars0.githubusercontent.com/u/9919?s=280&v=4
 * twitter: #05ACF0 https://pmcdeadline2.files.wordpress.com/2016/09/twitter-logo.jpg
 */

/* available props: 
 * text: title, username, date_time, text, media
 * image link: user_icon, image
 */
function Card(props) {

  const barColour = (param) => {
    switch(param) {
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
    switch(param) {
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

  const classes = useStyles();

    return (
        <center>
          <div style = {{width: "30em", background: "#f2f2f2", padding:"0.6em", textAlign:"left", boxShadow:"0.48em 0.6em 0.3em grey", borderRadius: "0.48em 0.48em 0em 0em"}}>
              {props.user_icon ? <Avatar alt="Remy Sharp" src={props.user_icon} className={classes.large} style={{float: "left", margin:"0.6em"}} /> : <Avatar alt="Remy Sharp" src="https://img.icons8.com/windows/64/000000/user.png" style={{background: "#b3b3b3", float: "left", margin:"0.1em"}} className={classes.large} />}
              <h1 style={{lineHeight: "0.6em"}}>{props.title}</h1>
              <h2 style={{lineHeight: "0.6em", fontSize: "1.2em", color: "grey"}}>{props.username}</h2>
              <p>{props.text}</p>

              {/* only displays if there is an image */}
              <div>{props.image_link ? <img src={props.image_link} style = {{width: "30em"}}></img> : null}</div>
          </div>

          <div style = {{width: "30em", height: "1.2em", background: barColour(props.media), padding:"0.6em", textAlign:"left", boxShadow:"0.48em 0.48em 0.3em grey", borderRadius: "0em 0em 0.48em 0.48em"}}>
            <img src={mediaIcon(props.media)} style = {{width: "1.2em", padding:"0em", lineHeight:"0", margin:"0"}}/>
          </div>
        </center>
    );
}

export default Card;