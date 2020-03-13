import React from 'react';
import { FeedPage } from './pages/FeedPage';
import { HomePage } from './pages/HomePage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/feed">
          <FeedPage />
        </Route>
      </Switch>
    </Router>
  );
};
