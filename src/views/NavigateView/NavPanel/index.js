import React from 'react';
import {
  makeStyles,
  Grid,
  Typography,
} from '@material-ui/core';
import LinearProgressWithLabel from 'src/components/LinearProgressWithLabel';
import useGame from 'src/hooks/useGame';
import SliderWithLabel from 'src/components/SliderWithLabel';

const useStyles = makeStyles((theme) => ({
  panel: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    width: '100%',
    height: '100%',
    padding: 8
  },
  speedBar: {
    padding: 16
  }
}));

const NavPanel = () => {
  const classes = useStyles();
  const { gameState, updateAcceleration } = useGame();
  const { playerTrainStats } = gameState || {};
  const {
    speed,
    maxSpeed,
    acceleration = 0,
    maxAcceleration
  } = playerTrainStats || {};

  return (
    <div className={classes.panel}>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={4}
        >
          <div className={classes.speedBar}>
            <Typography>Speed</Typography>
            <LinearProgressWithLabel
              value={(speed / maxSpeed) * 100}
              label={speed}
              suffix="kmh"
            />
          </div>
        </Grid>
        <Grid
          item
          xs={4}
        >
          <div className={classes.speedBar}>
            <Typography>Acceleration</Typography>
            <SliderWithLabel
              value={acceleration}
              min={0}
              max={maxAcceleration}
              label={acceleration.toFixed(1)}
              onChange={updateAcceleration}
              suffix="kmh2"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NavPanel;
