import React from 'react';
import {
  RedditConnect,
  GithubConnect,
  TwitterConnect,
} from '../components/oauth';

/**
 * THIS PAGE IS FOR DEMONSTRATION PURPOSES ONLY AND SHOULD BE REMOVED IN THE FUTURE
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
