import React from 'react';
import PropTypes from 'prop-types';
import RestartIcon from '@material-ui/icons/Replay';
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
  gameOverText: {
    margin: 16
  },
  restartButton: {
    width: 48,
    height: 48,
    fontWeight: 'bolder'
  }
}));

const GameOverDialog = ({
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
        className={classes.gameOverText}
        variant="h3"
      >
        GAME OVER!
      </Typography>
      <IconButton
        className={classes.restartButton}
        onClick={onConfirm}
      >
        <RestartIcon className={classes.restartButton} />
      </IconButton>
    </Dialog>
  );
};

GameOverDialog.propTypes = {
  open: PropTypes.bool,
  onConfirm: PropTypes.func,
};

export default GameOverDialog;
