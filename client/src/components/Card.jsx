import React from 'react';

// available props: title, username, user_icon, date_time, text, image, media
function Card(props) {

    return (
        <center>
        <div style = {{width: "400px", background: "grey", padding:"10px", textAlign:"left"}}>
            <h1>{props.title}</h1>
            <h2>{props.username}</h2>
            <p>{props.text}</p>

            {/* only displays if there is an image */}
            <div>{props.image ? props.image : null}</div>
        </div>
        </center>
    );
}

export default Card;