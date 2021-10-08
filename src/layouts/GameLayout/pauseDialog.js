import React from 'react';
import PropTypes from 'prop-types';
import ContinueIcon from '@material-ui/icons/PlayArrow';
import {
  Dialog,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  dialog: {
    height: '60vh',
    '& .MuiDialog-paper': {
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
  },
  text: {
    margin: 16
  },
  continueButton: {
    width: 48,
    height: 48,
    fontWeight: 'bolder'
  }
}));

const PauseDialog = ({
  open = true,
  onConfirm = () => { }
}) => {
  const classes = useStyles();

  return (
    <Dialog
      className={classes.dialog}
      open={open}
    >
      <Typography
        className={classes.text}
        variant="h3"
      >
        Game is Paused!
      </Typography>
      <IconButton
        className={classes.continueButton}
        onClick={onConfirm}
      >
        <ContinueIcon className={classes.continueButton} />
      </IconButton>
    </Dialog>
  );
};

PauseDialog.propTypes = {
  open: PropTypes.bool,
  onConfirm: PropTypes.func,
};

export default PauseDialog;
