import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <Button>
      <Link to="/feed">Login</Link>
    </Button>
  );
};
