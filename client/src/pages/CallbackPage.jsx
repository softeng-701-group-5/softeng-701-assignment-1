import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import APPS from '../configs/feedr-apps';
import CookieManager from '../components/oauth/CookieManager';

export const CallbackPage = props => {
  const params = useParams();

  useEffect(() => {
    if (params.app === 'reddit') {
      fetch('/proxy/reddit/token' + props.location.search, {
        crossDomain: true,
        headers: { 'Content-Type': 'application/json' },
      })
        .then(resp => resp.json())
        .then(data => CookieManager.setUserToken(data, APPS.reddit.name))
        .then(props.history.push('/connect'));

      // TODO: Handle errors returned from the above fetch
    }
  });

  return <div>Redirecting, please wait...</div>;
};
