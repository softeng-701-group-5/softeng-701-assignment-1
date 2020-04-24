import React from 'react';
import {
  RedditConnect,
  GithubConnect,
  TwitterConnect,
} from '../components/oauth';

/**
 * TODO: THIS PAGE IS FOR DEMONSTRATION PURPOSES ONLY AND SHOULD BE CHANGED/REMOVED IN THE FUTURE
 * TODO: Add a method for disconnecting apps
 */
export const ConnectPage = () => {
  return (
    <div>
      <h1>
        Refresh the page once you've logged in/refreshed to see updates to
        Reddit and GitHub!!!!!!!!!!
      </h1>
      <h1>-------------------</h1>
      <RedditConnect />
      <GithubConnect />
      <TwitterConnect />
    </div>
  );
};
