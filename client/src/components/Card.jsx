import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TwitterIcon from '../assets/twitter-icon.svg';
import SpotifyIcon from '../assets/spotify-icon.svg';
import GithubIcon from '../assets/github-icon.svg';
import RedditIcon from '../assets/reddit-icon.svg';
import styles from './Card.module.css'

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


/* available props: 
 * text: title, username, date_time, text, media
 * image link: user_icon, image
 */
function Card(props) {

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

  const classes = useStyles();

  return (
    <center>
      <div className={styles.card} >
        {props.user_icon ? 
          <Avatar alt="Remy Sharp" src={props.user_icon} className={classes.large} style={{ float: "left", margin: "0.6em" }} /> : 
          <Avatar alt="Remy Sharp" src="https://img.icons8.com/windows/64/000000/user.png" style={{ background: "#b3b3b3", float: "left", margin: "0.1em" }} className={classes.large} />}
        <h1>{props.title}</h1>
        <h2>{props.username}</h2>
        <p>{props.text}</p>

        {/* only displays if there is an image */}
        <div>{props.image_link ? 
          <img id="myImg" alt="Random" src={props.image_link} style={{ width: "30em" }} 
            onClick={
              () => {
                var modal = document.getElementById('myModal');
                var img = document.getElementById('myImg');
                var modalImg = document.getElementById("img01");
                var captionText = document.getElementById("caption");
                var span = document.getElementById("close");
                modal.style.display = "block";
                modalImg.style.display = "block";
                captionText.style.display = "block";
                span.style.display = "block";
                modalImg.src = img.src;
                captionText.innerHTML = img.alt;
    
                span.onclick = function () {
                  modal.style.display = "none";
                  modalImg.style.display = "none";
                  captionText.style.display = "none";
                  this.style.display = "none";
                }
              }
            } /> : null}
        </div>
      </div>

      {/* colour bar */}
      <div className={styles.colourbar} style={{background: barColour(props.media)}}>
        <img src={mediaIcon(props.media)} className={styles.mediaicon} />
      </div>

      {/* Modal */}
      <div id="myModal" className={styles.modal}>
        <span id="close" className={styles.close}>&times;</span>
        <img alt="" src="" id="img01"  className={styles.modalimage} />
        <div id="caption"></div>
      </div>
    </center>
  );
}

export default Card;