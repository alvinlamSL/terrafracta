import React from 'react';
import ContinueIcon from '@material-ui/icons/PlayArrow';
import {
  Dialog,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core';
import useGame from 'src/hooks/useGame';

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

const CommsDialog = () => {
  const classes = useStyles();
  const { playerTrainStats, playerTrain } = useGame();
  const { comms = false } = playerTrainStats;
  const structComms = playerTrain[0]?.currStruct?.comms || false;

  return (
    <Dialog
      className={classes.dialog}
      open={comms && structComms}
    >
      <Typography
        className={classes.text}
        variant="h3"
      >
        Comms Dialog
      </Typography>
      <IconButton
        className={classes.continueButton}
      >
        <ContinueIcon className={classes.continueButton} />
      </IconButton>
    </Dialog>
  );
};

export default CommsDialog;
