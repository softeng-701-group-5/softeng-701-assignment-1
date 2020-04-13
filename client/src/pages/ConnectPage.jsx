import React from 'react';
import { oauth } from '../common/oauth';
import APPS from '../configs/feedr-apps';

/**
 * THIS PAGE IS FOR DEMONSTRATION PURPOSES ONLY AND SHOULD BE REMOVED IN THE FUTURE
 */
export const ConnectPage = () => {
  const r = () => {
    oauth.authorizeApp(APPS.reddit.name);
  };

  const g = () => {
    oauth.authorizeApp(APPS.github.name);
  };

  const t = () => {
    oauth.authorizeApp(APPS.twitter.name);
  };

  return (
    <div>
      <button onClick={r}>Reddit</button>
      <button onClick={g}>GitHub</button>
      <button onClick={t}>Twitter</button>
    </div>
  );
};
