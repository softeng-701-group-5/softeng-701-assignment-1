import React from 'react';
import {
  AppBar,
  Grid,
  IconButton,
  Button,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AppsRoundedIcon from '@material-ui/icons/AppsRounded';
import ViewStreamRoundedIcon from '@material-ui/icons/ViewStreamRounded';
import { SearchBox } from './SearchBox';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  appBar: {
    display: 'flex',
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
  appBarContents: {
    display: 'flex',
  },
  title: {
    color: 'white',
  },
  headerButtons: {
    color: '#FFFFFF',
  },
}));

export const Header = props => {
  const classes = useStyles();
  const { signOut } = useAuth();

  const handleClick = layoutSelected => {
    props.setLayout(layoutSelected);
  };

  return (
    <AppBar
      position="static"
      style={{ background: props.getTheme === 'light' ? '#3d3fb3' : '#2e3b55' }}
    >
      <Grid
        className={classes.appBar}
        alignItems={'center'}
        justify={'space-between'}
      >
        <div className={classes.appBarContents}>
          <Button
            className={classes.title}
            variant="h6"
            component={Link}
            to={'/'}
            children={'Feedr'}
          />
          <SearchBox setSearch={props.setSearch} />
        </div>
        <div className={classes.appBarContents}>
          <FormControlLabel
            control={<Switch onChange={() => props.toggleTheme()} />}
          />
          <IconButton
            onClick={() =>
              handleClick(props.layout === 'grid' ? 'row' : 'grid')
            }
            color="inherit"
            className={classes.headerButtons}
          >
            {props.layout === 'grid' ? (
              <ViewStreamRoundedIcon />
            ) : (
              <AppsRoundedIcon />
            )}
          </IconButton>
          <IconButton
            component={Link}
            to={'/'}
            color="inherit"
            className={classes.headerButtons}
            onClick={signOut}
          >
            <ExitToAppIcon />
          </IconButton>
        </div>
      </Grid>
    </AppBar>
  );
};
