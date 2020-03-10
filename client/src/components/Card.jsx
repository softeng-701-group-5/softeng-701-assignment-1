import React from 'react';

/* colours and logos: 
 * reddit:  #FF4500 https://redditupvoted.files.wordpress.com/2015/10/reddit_icon_twitter_fb.png
 * spotify: #23D05F https://pbs.twimg.com/profile_images/558366562424332288/8ObpK74F.png
 * github:  #010101 https://avatars0.githubusercontent.com/u/9919?s=280&v=4
 * twitter: #05ACF0 https://pmcdeadline2.files.wordpress.com/2016/09/twitter-logo.jpg
 * /

/* available props: 
 * text: title, username, date_time, text, media
 * image link: user_icon, image
 */
function Card(props) {

    return (
        <center>
        <div style = {{width: "400px", background: "#e6e6e6", padding:"10px", textAlign:"left"}}>
            <h1>{props.title}</h1>
            <h2>{props.username}</h2>
            <p>{props.text}</p>

            {/* only displays if there is an image */}
            <div>{props.image_link ? <img src={props.image_link} style = {{width: "400px"}}></img> : null}</div>
        </div>
        </center>
    );
}

export default Card;