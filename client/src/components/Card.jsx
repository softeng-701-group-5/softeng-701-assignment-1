import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

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

  const barcolour = (param) => {
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

  const classes = useStyles();

    return (
        <center>
          <div style = {{width: "500px", background: "#f2f2f2", padding:"10px", textAlign:"left", boxShadow:"8px 10px 5px grey", borderRadius: "8px 8px 0px 0px"}}>
              {props.user_icon ? <Avatar alt="Remy Sharp" src={props.user_icon} className={classes.large} style={{float: "left", margin:"10px"}} /> : <Avatar alt="Remy Sharp" src="https://img.icons8.com/windows/64/000000/user.png" style={{background: "#b3b3b3", float: "left", margin:"10px"}} className={classes.large} />}
              <h1 style={{lineHeight: "10px"}}>{props.title}</h1>
              <h2 style={{lineHeight: "10px", fontSize: "20px", color: "grey"}}>{props.username}</h2>
              <p>{props.text}</p>

              {/* only displays if there is an image */}
              <div>{props.image_link ? <img src={props.image_link} style = {{width: "500px"}}></img> : null}</div>
          </div>

          <div style = {{width: "500px", background: barcolour(props.media), padding:"10px", textAlign:"left", boxShadow:"8px 8px 5px grey", borderRadius: "0px 0px 8px 8px"}} />
        </center>
    );
}

export default Card;