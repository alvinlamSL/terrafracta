import React from 'react';
import useGame from 'src/hooks/useGame';
import GameDialog from 'src/components/GameDialog';

const CommsDialog = () => {
  const { playerTrainStats, playerTrain } = useGame();
  const { comms = false } = playerTrainStats;
  const structComms = playerTrain[0]?.currStruct?.comms || false;

  return (
    <GameDialog
      title="Comms Dialog"
      text="TEST TEXT"
      open={comms && structComms}
    />
  );
};

export default CommsDialog;
