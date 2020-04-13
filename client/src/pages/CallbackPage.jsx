import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { oauth } from '../common/oauth';

export const CallbackPage = props => {
  const params = useParams();

  useEffect(() => {
    oauth.getAppToken(params.app, props.location.search.substring(1));
    // TODO: Handle going back to connect page
  });

  return (
    <div>
      <h1>callback</h1>
    </div>
  );
};
