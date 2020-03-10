import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <Link to="/feed">
      <Button color="blue">LOGIN</Button>
    </Link>
  );
};
