import React from 'react';
import {
  Typography,
  CardActions,
  Modal,
  Backdrop,
  Fade,
  makeStyles,
} from '@material-ui/core';
import externalLinkIcon from '../assets/external-link.png';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 600,
    outline: 'none',
    borderRadius: 5,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalTitle: {
    width: 500,
    paddingLeft: 50,
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
  modalLink: {
    width: 500,
    position: 'absolute',
    justifyContent: 'right',
    textAlign: 'right',
  },
  modalFooter: {
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'left',
  },
}));

export const FeedrModal = props => {
  const classes = useStyles();

  //Change the provided source links to go to correct webpage
  var externalLink;
  switch (props.media) {
    case 'reddit':
      externalLink = props.mediaSourceLink;
      break;
    case 'hackernews':
      externalLink = props.mediaSourceLink.replace('ask/', 'item?id=');
      break;
    case 'github':
      externalLink = props.mediaSourceLink
        .replace('api.', '')
        .replace('repos/', '');
      break;
  }

  if (props.media != 'twitter') {
    var renderLink = (
      <React.Fragment>
        <a href={externalLink} target="_blank">
          <img src={externalLinkIcon} alt={`link icon`} height="25px" />
        </a>
      </React.Fragment>
    );
  }

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
        <div className={classes.paper}>
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
            <Typography variant="body" color="textSecondary" component="p">
              {props.mainText}
            </Typography>
            <br />
            <div className={classes.modalFooter}>
              <Typography>
                {`${props.username} - ${props.relativeTime}`}
              </Typography>
              <Typography className={classes.modalLink}>
                {renderLink}
              </Typography>
            </div>
          </Typography>
        </div>
      </Fade>
    </Modal>
  );
};
