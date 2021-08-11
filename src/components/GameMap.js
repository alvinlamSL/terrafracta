import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import calculateZoom from 'src/utils/calculateZoom';
import calculatePan from 'src/utils/calculatePan';

const GameMap = ({
  cols,
  rows,
  gridSize,
  children,
  height = '80vh',
  width = '80vw'
}) => {
  const [panStart, setPanStart] = useState(null);
  const [viewBox, setViewBox] = useState();
  const vbWidth = cols * gridSize + 2;
  const vbHeight = rows * gridSize + 2;

  // update the viewBox whenever the map changes dimensions
  useEffect(() => (
    setViewBox({
      x: 0,
      y: 0,
      width: cols * gridSize + 2,
      height: rows * gridSize + 2
    })
  ), [cols, rows]);

  const handleZoom = (event) => {
    const { deltaY, target } = event;
    const newViewBox = calculateZoom(
      viewBox,
      deltaY,
      target.x.animVal.value,
      target.y.animVal.value,
      vbWidth,
      vbHeight
    );
    setViewBox(newViewBox);
  };

  const handlePan = (event) => {
    if (event.type === 'mousedown') {
      setPanStart(true);
    } else if (event.type === 'mousemove' && panStart) {
      const { movementX, movementY } = event;
      const newViewBox = calculatePan(
        viewBox,
        movementX,
        movementY,
        vbWidth,
        vbHeight
      );
      setViewBox(newViewBox);
    } else if (event.type === 'mouseup') {
      setPanStart(null);
    }
  };

  return (
    <svg
      height={height}
      width={width}
      // preserveAspectRatio="xMaxYMid meet"
      viewBox={viewBox && `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
      onWheel={handleZoom}
      onMouseDown={handlePan}
      onMouseMove={handlePan}
      onMouseUp={handlePan}
    >
      <rect
        x="0"
        y="0"
        width={vbWidth}
        height={vbHeight}
        style={{ fill: '#54575b', stroke: 'green', strokeWidth: '1px' }}
      />
      <g transform="translate(1,1)">
        <Grids
          rows={rows}
          cols={cols}
          gridSize={gridSize}
        />
        {children}
      </g>

    </svg>
  );
};

const Grids = React.memo(({
  cols,
  rows,
  gridSize
}) => {
  const GridRects = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      GridRects.push(
        <rect
          key={`${i} ${j}`}
          x={i * gridSize}
          y={j * gridSize}
          width={gridSize}
          height={gridSize}
          style={{
            fillOpacity: '0',
            stroke: '#1c2025',
            strokeWidth: '1px'
          }}
        />
      );
    }
  }

  return (
    <>
      {GridRects}
    </>
  );
});

GameMap.propTypes = {
  cols: PropTypes.number,
  rows: PropTypes.number,
  gridSize: PropTypes.number,
  children: PropTypes.node,
  height: PropTypes.number,
  width: PropTypes.number
};

Grids.propTypes = {
  cols: PropTypes.number,
  rows: PropTypes.number,
  gridSize: PropTypes.number
};

export default GameMap;
