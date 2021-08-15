import React from 'react';
import { makeStyles } from '@material-ui/core';
import GameMap from 'src/components/GameMap';
import useGame from 'src/hooks/useGame';
import PlayerTrain from './PlayerTrain';
import TrackTiles from './TrackTiles';

const useStyles = makeStyles(() => ({
  root: {
    height: 'calc(100% - 256px)',
    backgroundColor: 'green'
  }
}));

const NavigateMap = ({ ...rest }) => {
  const classes = useStyles();
  const { gridSize, gameMap, gameState } = useGame();
  const { tiles } = gameMap;

  return (
    <div className={classes.root}>
      <GameMap
        {...rest}
        height="100%"
        width="100%"
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
    </div>
  );
};

export default NavigateMap;
