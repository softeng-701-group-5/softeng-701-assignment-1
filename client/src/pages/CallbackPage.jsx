import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const CallbackPage = props => {
  const params = useParams();

  useEffect(() => {
    console.log(params.app, props.location.search);

    if (params.app === 'reddit') {
      fetch('/proxy/reddit/token' + props.location.search, {
        crossDomain: true,
        headers: { 'Content-Type': 'application/json' },
      })
        .then(resp => resp.json())
        .then(data => console.log('THE FINAL DATA: ' + data));
    }
    // TODO: Handle going back to connect page
  });

  return (
    <div>
      <h1>callback</h1>
    </div>
  );
};
