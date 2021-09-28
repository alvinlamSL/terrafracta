import calculateTrainPos from 'src/utils/calculateTrainPos';

const getNextTile = (
  direction,
  currTile,
  gameMap
) => {
  const { name } = currTile;
  let { row, col } = currTile;
  if (name.includes('nw') && (
    direction.includes('n') || direction.includes('w')
  )) {
    row -= 1;
    col -= 1;
  } else if (name.includes('sw') && (
    direction.includes('s') || direction.includes('w')
  )) {
    row += 1;
    col -= 1;
  } else if (name.includes('ne') && (
    direction.includes('n') || direction.includes('e')
  )) {
    row -= 1;
    col += 1;
  } else if (name.includes('se') && (
    direction.includes('s') || direction.includes('e')
  )) {
    row += 1;
    col += 1;
  } else if (name.includes('n') && direction.includes('n')) {
    row -= 1;
  } else if (name.includes('s') && direction.includes('s')) {
    row += 1;
  } else if (name.includes('e') && direction.includes('e')) {
    col += 1;
  } else if (name.includes('w') && direction.includes('w')) {
    col -= 1;
  }

  return gameMap.tiles.find((tile) => (
    tile.row === row && tile.col === col
    && tile.type === 'tracks'
  ));
};

const updateTrainComponent = (
  deltaTime,
  speed,
  trainComponent,
  gridSize,
  gameMap
) => {
  const { direction } = trainComponent;
  let { prevTile, currTile, progress } = trainComponent;

  progress += (speed * deltaTime);
  if (progress >= 1) {
    progress -= 1;
    prevTile = { ...currTile };
    currTile = getNextTile(direction, currTile, gameMap);
  }

  const position = calculateTrainPos(gridSize, prevTile, currTile, progress);
  const currStruct = gameMap?.tiles.find((tile) => (
    tile.row === currTile.row && tile.col === currTile.col
    && tile.type === 'structures'
  )) || '';
  return ({
    ...trainComponent,
    ...position,
    prevTile,
    currTile,
    currStruct,
    progress,
  });
};

const updatePlayerTrain = (
  deltaTime,
  speed,
  train,
  gridSize,
  gameMap
) => {
  // update each component in the train
  const newTrain = train.map((component) => (
    updateTrainComponent(deltaTime, speed, component, gridSize, gameMap)
  ));
  return newTrain;
};

export default updatePlayerTrain;
