import React from 'react';
import GameMap from 'src/components/GameMap';
import useGame from 'src/hooks/useGame';
import PlayerTrain from './PlayerTrain';
import TrackTiles from './TrackTiles';

const NavigateMap = ({ ...rest }) => {
  const { gridSize, gameMap, gameState } = useGame();
  const { tiles } = gameMap;

  return (
    <GameMap
      {...rest}
      cols={gameMap.cols}
      rows={gameMap.rows}
      gridSize={gridSize}
    >
      <TrackTiles
        gridSize={gridSize}
        tiles={tiles}
      />
      {gameState.playerTrain && (
        <PlayerTrain
          train={gameState.playerTrain}
        />
      )}
    </GameMap>
  );
};

export default NavigateMap;
