import React from 'react';
import PropTypes from 'prop-types';
import ContinueIcon from '@material-ui/icons/PlayArrow';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  dialog: {
    height: '60vh',
    '& .MuiDialog-paper': {
    },
  },
  text: {
    margin: 16
  },
  continueButton: {
    width: 18,
    height: 18,
    fontWeight: 'bolder'
  },
  dialogButton: {
    padding: 16
  }
}));

const GameDialog = ({
  title = 'Test Dialog',
  text = 'TEST TEXT',
  open = true,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      className={classes.dialog}
      open={open}
    >
      <DialogTitle
        disableTypography
      >
        <Typography
          variant="h3"
        >
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Typography>
          {text}
        </Typography>
      </DialogContent>
      <DialogActions>
        <IconButton
          className={classes.continueButton}
        >
          <ContinueIcon className={classes.continueButton} />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};

GameDialog.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  open: PropTypes.bool,
};

export default GameDialog;
