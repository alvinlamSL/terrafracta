import { clamp } from 'lodash';

const handleKeypress = (
  keypress,
  gameState,
) => {
  const { playerTrainStats } = gameState;

  // separate logic to handle pausing/unpausing
  if (keypress === ' ' && !playerTrainStats.comms) {
    const paused = !gameState.paused;
    return { paused };
  }

  // separate logic to handle comms
  if (keypress === 'c' && !gameState.paused) {
    const { playerTrain } = gameState;
    const { speed } = playerTrainStats;

    // IF train is stopped
    // AND on top of a comms structure
    if (speed === 0 && playerTrain[0].currStruct?.comms) {
      const comms = !playerTrainStats.comms;
      const newPlayerTrainStats = { ...playerTrainStats, comms };
      return { ...gameState, playerTrainStats: newPlayerTrainStats };
    }

    // else do nothing
    return { };
  }

  // don't allow keypresses when paused
  if (!gameState.paused && !playerTrainStats.comms) {
    switch (keypress) {
      case 'q': {
        const { maxAcceleration } = playerTrainStats;
        let { acceleration } = playerTrainStats;
        acceleration = clamp(acceleration - 0.05, 0, maxAcceleration);
        const newPlayerTrainStats = { ...playerTrainStats, acceleration };
        return { ...gameState, playerTrainStats: newPlayerTrainStats };
      }
      case 'e': {
        const { maxAcceleration } = playerTrainStats;
        let { acceleration } = playerTrainStats;
        acceleration = clamp(acceleration + 0.05, 0, maxAcceleration);
        const newPlayerTrainStats = { ...playerTrainStats, acceleration };
        return { ...gameState, playerTrainStats: newPlayerTrainStats };
      }
      case 'r': {
        const brake = !playerTrainStats.brake;
        const newPlayerTrainStats = { ...playerTrainStats, brake };
        return { ...gameState, playerTrainStats: newPlayerTrainStats };
      }
      case 't': {
        const emergencyMode = !playerTrainStats.emergencyMode;
        const newPlayerTrainStats = { ...playerTrainStats, emergencyMode };
        return { ...gameState, playerTrainStats: newPlayerTrainStats };
      }
      default: return { };
    }
  }

  return { };
};

export default handleKeypress;
