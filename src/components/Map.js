import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { clamp } from 'lodash';

const Map = ({
  cols,
  rows,
  gridSize
}) => {
  const [viewBox, setViewBox] = useState({
    x: 0,
    y: 0,
    width: 500,
    height: 500
  });
  const width = cols * gridSize + 2;
  const height = rows * gridSize + 2;

  const handleZoom = (event) => {
    // TODO: when scrolling, the map should move towards the cursor location
    const { deltaY } = event;
    const newWidth = clamp(viewBox.width + deltaY, 100, width);
    const newHeight = clamp(viewBox.height + deltaY, 100, height);
    console.log(event);
    setViewBox({
      ...viewBox,
      width: newWidth,
      height: newHeight
    });
  };

  return (
    <svg
      height="100%"
      preserveAspectRatio="xMaxYMid meet"
      viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
      onWheel={handleZoom}
    >
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        style={{ fill: '#54575b', stroke: 'green', strokeWidth: '1px' }}
      />
      <g transform="translate(1,1)">
        <Grids
          rows={rows}
          cols={cols}
          gridSize={gridSize}
        />
      </g>
    </svg>
  );
};

const Grids = React.memo(({
  gridSize
}) => {
  const gridRects = [];
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      console.log(i, j);
      gridRects.push({
        key: `${i} ${j}`,
        x: i * gridSize,
        y: j * gridSize,
        width: gridSize,
        height: gridSize,
        style: {
          fillOpacity: '0',
          stroke: '#1c2025',
          strokeWidth: '1px'
        }
      });
    }
  }

  return (
    <>
      {gridRects.map((gridRect) => (
        <rect
          {...gridRect}
        />
      ))}
    </>
  );
});

Map.propTypes = {
  cols: PropTypes.number,
  rows: PropTypes.number,
  gridSize: PropTypes.number
};

Grids.propTypes = {
  gridSize: PropTypes.number
};

export default Map;
