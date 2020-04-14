import React from 'react';
import {
  RedditConnect,
  GithubConnect,
  TwitterConnect,
} from '../components/oauth';

/**
 * TODO: THIS PAGE IS FOR DEMONSTRATION PURPOSES ONLY AND SHOULD BE CHANGED/REMOVED IN THE FUTURE
 */
export const ConnectPage = () => {
  return (
    <div>
      <RedditConnect />
      <GithubConnect />
      <TwitterConnect />
    </div>
  );
};
