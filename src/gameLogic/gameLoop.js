import updatePlayerTrain from './updatePlayerTrain';

// This is the game loop, the game mechanics
// are all controlled from here
const gameLoop = (state, deltaTime) => {
  console.log(deltaTime);

  const { gameMap, gameState, gridSize } = state;
  const { playerTrain, playerTrainStats } = gameState;
  const { speed } = playerTrainStats;

  const newGameState = {
    ...gameState,
    playerTrain: updatePlayerTrain(
      deltaTime,
      speed,
      playerTrain,
      gridSize,
      gameMap
    )
  };
  return { gameState: newGameState };
};

export default gameLoop;
