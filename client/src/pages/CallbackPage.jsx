import React, { useEffect } from 'react';

export const CallbackPage = props => {
  useEffect(() => {
    console.log('~~~~');
    console.log(props.location.search);
  });

  return (
    <div>
      <h1>callback</h1>
    </div>
  );
};
