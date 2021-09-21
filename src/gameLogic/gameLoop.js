import updatePlayerTrain from './updatePlayerTrain';
import updateTrainStats from './updateTrainStats';

// This is the game loop, the game mechanics
// are all controlled from here
const gameLoop = (state, deltaTime) => {
  // console.log(deltaTime);

  const {
    gameMap,
    gridSize,
    playerTrain,
    playerTrainStats
  } = state;
  const { speed } = playerTrainStats;

  // update the train location
  const newPlayerTrain = updatePlayerTrain(
    deltaTime,
    speed,
    playerTrain,
    gridSize,
    gameMap
  );

  // update the train stats
  const newPlayerTrainStats = updateTrainStats(playerTrainStats, deltaTime);

  return {
    playerTrain: newPlayerTrain,
    playerTrainStats: newPlayerTrainStats
  };
};

export default gameLoop;
