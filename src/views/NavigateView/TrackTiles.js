import React from 'react';
import PropTypes from 'prop-types';

const TrackTile = ({ gridSize, tile }) => {
  const {
    col,
    row,
    type,
    name
  } = tile;
  const x = col * gridSize;
  const y = row * gridSize;
  const sprite = `sprites/${type}/${name}.svg#${name}`;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <use href={sprite} />
    </g>
  );
};

const TrackTiles = React.memo(({
  gridSize,
  tiles
}) => {
  return (
    <>
      {tiles.map((tile) => (
        <TrackTile
          key={
            `${tile.type}_${tile.name}_${tile.col}_${tile.row}`
          }
          gridSize={gridSize}
          tile={tile}
        />
      ))}
    </>
  );
});

TrackTile.propTypes = {
  gridSize: PropTypes.number,
  tile: PropTypes.object
};

TrackTiles.propTypes = {
  gridSize: PropTypes.number,
  tiles: PropTypes.array
};

export default TrackTiles;
