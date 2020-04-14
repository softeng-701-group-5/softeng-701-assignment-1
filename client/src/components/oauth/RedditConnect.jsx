import React from 'react';
// import TwitterLogin from 'react-twitter-login';
import APPS from '../../configs/feedr-apps';

const reddit = APPS.reddit;

export const RedditConnect = props => {
  const authHandler = (err, data) => {
    console.log(err, data);
  };

  const connectReddit = props => {
    // const url = `${reddit.authUrl}?client_id=${reddit.clientId}&response_type=code&
    // state=abc123&redirect_uri=${reddit.redirectUrl}&duration=permanent&scope=read`;

    // const opt = {
    //   method: 'GET',
    // };

    // fetch(url, opt).then(resp => console.log(resp));

    // corsProxyTest();

    window.location =
      'https://www.reddit.com/api/v1/authorize?client_id=E6V2MtwA-JLx1w&response_type=code&state=abc123&redirect_uri=http://localhost:3001/oauth/callback/reddit&duration=permanent&scope=read';
  };

  return (
    <div>
      <button onClick={connectReddit}>LOGIN TO REDDIT</button>
    </div>
  );
};

function corsProxyTest() {
  // // let targetOrigin = 'http://example.com';
  // const targetOrigin = `${reddit.authUrl}?client_id=${reddit.clientId}&response_type=code&
  //   state=abc123&redirect_uri=${reddit.redirectUrl}&duration=permanent&scope=read`;
  // // let proxyUrl = 'http://cors-proxy.com/post/user';
  // const proxyUrl = 'http://localhost:3001/';
  // let user = { userId: 'userId', post: 'hello!' };
  // fetch(proxyUrl, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Target-URL': targetOrigin,
  //   },
  // })
  //   .then(function(response) {
  //     return response.json();
  //   })
  //   .then(function(data) {
  //     console.log('response: ', data);
  //   });
  // fetch('/api/greeting?name=Jeff', {
  //   crossDomain: true,
  //   headers: { 'Content-Type': 'application/json' },
  // })
  //   .then(resp => resp.json())
  //   .then(data => console.log(data));
  // props.history.push(
  //   'https://www.reddit.com/api/v1/authorize?client_id=E6V2MtwA-JLx1w&response_type=code&state=abc123&redirect_uri=http://localhost:3001/test/oauth/callback&duration=permanent&scope=read'
  // );
}
