import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const CallbackPage = props => {
  const params = useParams();

  useEffect(() => {
    console.log(params.app, props.location.search);
    // TODO: Handle going back to connect page
  });

  return (
    <div>
      <h1>callback</h1>
    </div>
  );
};
