import initialiseGameMap from './initialiseGameMap';
import initialiseGameState from './initialiseGameState';
import updatePlayerTrain from './updatePlayerTrain';

const initialiseGame = async (gridSize) => {
  const gameMap = await initialiseGameMap();
  const gameState = await initialiseGameState();

  const { playerTrain, playerTrainStats } = gameState;
  const { speed } = playerTrainStats;

  gameState.playerTrain = updatePlayerTrain(0, speed, playerTrain, gridSize, gameMap);
  return ({ gameMap, gameState });
};

export default initialiseGame;
