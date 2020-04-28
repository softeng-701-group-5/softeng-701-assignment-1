import React from 'react';
import {
  AppBar,
  Grid,
  IconButton,
  Button,
  Switch,
  FormControlLabel,
  Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AppsRoundedIcon from '@material-ui/icons/AppsRounded';
import ViewStreamRoundedIcon from '@material-ui/icons/ViewStreamRounded';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import { SearchBox } from './SearchBox';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { IntegrationModal } from './IntegrationModal';

const useStyles = makeStyles(theme => ({
  appBar: {
    display: 'flex',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    justifyContent: 'space-between',
  },
  appBarContentLeft: {
    display: 'flex',
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingRight: '3px',
  },
  appBarContentRight: {
    display: 'flex',
  },
  headerButtons: {
    color: '#FFFFFF',
  },
}));

export const Header = props => {
  const classes = useStyles();
  const { signOut } = useAuth();
  const { googleUser } = useAuth();
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  const handleClick = layoutSelected => {
    props.setLayout(layoutSelected);
  };

  const handleOpenAuth = () => {
    setOpenAuthModal(true);
  };

  const handleCloseAuth = () => {
    setOpenAuthModal(false);
  };

  return (
    <AppBar
      position="sticky"
      style={{ background: props.getTheme === 'light' ? '#3d3fb3' : '#2e3b55' }}
    >
      <Grid className={classes.appBar}>
        <div className={classes.appBarContentLeft}>
          <Avatar
            className={classes.image}
            src={googleUser?.profileObj?.imageUrl}
          />
          <Button
            className={classes.headerButtons}
            variant="h6"
            component={Link}
            to={'/'}
            children={googleUser?.profileObj?.givenName}
          />
          <SearchBox setSearch={props.setSearch} />
        </div>
        <div className={classes.appBarContentRight}>
          <FormControlLabel
            className={classes.headerButtons}
            checked={props.getTheme === 'dark'}
            control={<Switch onChange={() => props.toggleTheme()} />}
          />
          <IconButton
            onClick={handleOpenAuth}
            color="inherit"
            className={classes.headerButtons}
          >
            <VpnKeyIcon />
          </IconButton>
          <IntegrationModal
            theme={props.getTheme}
            open={openAuthModal}
            handleCloseAuth={handleCloseAuth}
          />
          <IconButton
            className={classes.headerButtons}
            onClick={() => console.log('filter favorites')}
          >
            <FavoriteIcon />
            {/* <FavoriteBorderIcon /> */}
          </IconButton>
          <IconButton
            className={classes.headerButtons}
            onClick={() =>
              handleClick(props.layout === 'grid' ? 'row' : 'grid')
            }
          >
            {props.layout === 'grid' ? (
              <ViewStreamRoundedIcon />
            ) : (
              <AppsRoundedIcon />
            )}
          </IconButton>
          <IconButton
            className={classes.headerButtons}
            component={Link}
            to={'/'}
            onClick={signOut}
          >
            <ExitToAppIcon />
          </IconButton>
        </div>
      </Grid>
    </AppBar>
  );
};
