import React from 'react';

// available props: title, username, user_icon, date_time, text, image, media
function Card(props) {
    return (
        <center>
        <div style = {{width: "400px", background: "grey", padding:"10px"}}>
            <h1>{props.title}</h1>
            <h2>{props.username}</h2>
            <p>{props.text}</p>
        </div>
        </center>
    );
}

export default Card;