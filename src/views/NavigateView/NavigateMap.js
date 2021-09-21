import React from 'react';
import { makeStyles } from '@material-ui/core';
import GameMap from 'src/components/GameMap';
import useGame from 'src/hooks/useGame';
import PlayerTrain from './PlayerTrain';
import TrackTiles from './TrackTiles';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  }
}));

const NavigateMap = ({ ...rest }) => {
  const classes = useStyles();
  const { gridSize, gameMap, playerTrain } = useGame();
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
        {playerTrain && (
          <PlayerTrain
            train={playerTrain}
          />
        )}
      </GameMap>
    </div>
  );
};

export default NavigateMap;
