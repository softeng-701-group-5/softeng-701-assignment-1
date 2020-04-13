import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { oauth } from '../common/oauth';

export const CallbackPage = props => {
  const params = useParams();

  useEffect(() => {
    console.log('~~~~');
    console.log(params.app);
    console.log(props.location.search);

    oauth.accessApp(params.app, props.location.search);
  });

  return (
    <div>
      <h1>callback</h1>
    </div>
  );
};
