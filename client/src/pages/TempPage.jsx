import React from 'react';

export const TempPage = () => {
  const r = () => {
    console.log('REDDIT');
  };

  const t = () => {
    console.log('TWITTER');
  };

  const g = () => {
    console.log('GITHUB');
  };

  return (
    <div>
      <button onClick={r}>Reddit</button>
      <button onClick={t}>Twitter</button>
      <button onClick={g}>GitHub</button>
    </div>
  );
};
