import React from 'react';
import {
  Typography,
  CardActions,
  Modal,
  Backdrop,
  Fade,
  makeStyles,
} from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflowY: 'auto',
    verticalAlign: 'middle',
  },
  paper: {
    width: 600,
    outline: 'none',
    borderRadius: 5,
    // backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: 'auto',
  },
  modalTitle: {
    width: 600,
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 30,
  },
  modalContent: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 50,
    paddingRight: 50,
  },
  lightTheme: {
    backgroundColor: '#E2E2E2',
    color: '#363537',
  },
  darkTheme: {
    backgroundColor: '#363537',
    color: '#FAFAFA',
  },
}));

export const FeedrModal = props => {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.open}
      disableAutoFocus={true}
      onBackdropClick={props.handleClose}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open} style={{ padding: '0px 0px 0px 0px' }}>
        <div
          className={classNames(
            classes.paper,
            props.getTheme === 'light' ? classes.lightTheme : classes.darkTheme
          )}
        >
          <CardActions
            style={{ backgroundColor: props.barColour(props.media) }}
            disableSpacing
          >
            <img
              src={props.mediaIcon(props.media)}
              alt={`${props.media} logo`}
              height="20px"
            />
          </CardActions>
          <Typography className={classes.modalTitle}>{props.title}</Typography>

          <Typography className={classes.modalContent}>
            <Typography variant="body" component="p">
              {props.mainText}
            </Typography>
            <br />
            <Typography>
              {`${props.username} - ${props.relativeTime}`}
            </Typography>
          </Typography>
        </div>
      </Fade>
    </Modal>
  );
};
