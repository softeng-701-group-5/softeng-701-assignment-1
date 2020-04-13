import React from 'react';
import { FeedPage } from './pages/FeedPage';
import { HomePage } from './pages/HomePage';
import { FavouritesPage } from './pages/FavouritesPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Loader } from './components/Loader';

const PrivateRoute = ({ component: Component, ...props }) => {
  const { isSignedIn, isInitialized } = useAuth();
  return (
    <Route
      {...props}
      render={props =>
        isInitialized ? (
          isSignedIn ? (
            <Component {...props} />
          ) : (
            <HomePage />
          )
        ) : (
          <Loader />
        )
      }
    />
  );
};

export const App = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={FeedPage} />
        <PrivateRoute exact path="/favourites" component={FavouritesPage} />
      </Switch>
    </Router>
  );
};
