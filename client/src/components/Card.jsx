import React from 'react';

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