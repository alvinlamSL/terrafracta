const calculateDirection = (
  prevTile,
  currTile
) => {
  let dir = '';
  const { row: prevRow, col: prevCol } = prevTile;
  const { row: currRow, col: currCol, name } = currTile;
  if (name.includes('nw') || name.includes('se')) {
    dir = (prevRow > currRow || prevCol > currCol) ? 'nw' : 'se';
  } else if (name.includes('sw') || name.includes('ne')) {
    dir = (prevRow < currRow || prevCol > currCol) ? 'sw' : 'ne';
  } else if (name.includes('n') || name.includes('s')) {
    dir = prevRow > currRow ? 'n' : 's';
  } else if (name.includes('e') || name.includes('w')) {
    dir = prevCol < currCol ? 'e' : 'w';
  }

  return dir;
};

const calculateXPos = (
  gridSize,
  currTile,
  direction,
  progress
) => {
  const { col, name } = currTile;

  let x = 0;
  if (name.includes('e') && name.includes('w')) {
    x = progress * 16; // for tracks that span left to right
    x = direction.includes('w') ? 16 - x : x; // reverse?
  } else if (name.includes('e')) {
    x = progress * 8; // for tracks that span right half
    x = direction.includes('w') ? 16 - x : x + 8; // reverse?
  } else if (name.includes('w')) {
    x = progress * 8; // for tracks that span left half
    x = direction.includes('w') ? 8 - x : x; // reverse?
  } else {
    x = 8; // for vertical tracks
  }

  x += col * gridSize;
  return x;
};

const calculateYPos = (
  gridSize,
  currTile,
  direction,
  progress
) => {
  const { row, name } = currTile;

  let y = 0;
  if (name.includes('n') && name.includes('s')) {
    y = progress * 16; // for tracks that span top to bottom
    y = direction.includes('n') ? 16 - y : y; // reverse?
  } else if (name.includes('s')) {
    y = progress * 8; // for tracks that span bottom half
    y = direction.includes('n') ? 16 - y : y + 8; // reverse?
  } else if (name.includes('n')) {
    y = progress * 8; // for tracks that span top half
    y = direction.includes('n') ? 8 - y : y; // reverse?
  } else {
    y = 8; // for vertical tracks
  }

  y += row * gridSize;
  return y;
};

const calculateTrainPos = (
  gridSize,
  prevTile,
  currTile,
  progress
) => {
  const direction = calculateDirection(prevTile, currTile);
  const x = calculateXPos(gridSize, currTile, direction, progress);
  const y = calculateYPos(gridSize, currTile, direction, progress);

  return ({ x, y, direction });
};

export default calculateTrainPos;
