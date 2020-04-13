import React from 'react';
import { oauth } from '../common/oauth';
import { APPS } from '../config/feedr-apps';

/**
 * THIS PAGE IS FOR DEMONSTRATION PURPOSES ONLY AND SHOULD BE REMOVED IN THE FUTURE
 */
export const TempPage = () => {
  const r = () => {
    oauth.connectApp(APPS.reddit);
  };

  const g = () => {
    oauth.connectApp(APPS.github);
  };

  const t = () => {
    oauth.connectApp(APPS.twitter);
  };

  return (
    <div>
      <button onClick={r}>Reddit</button>
      <button onClick={g}>GitHub</button>
      <button onClick={t}>Twitter</button>
    </div>
  );
};
