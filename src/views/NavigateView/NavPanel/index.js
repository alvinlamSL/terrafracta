import React from 'react';
import {
  makeStyles,
  Grid,
  Typography,
} from '@material-ui/core';
import useGame from 'src/hooks/useGame';
import SliderWithLabel from 'src/components/SliderWithLabel';
import SwitchWithLabel from 'src/components/SwitchWithLabel';

const useStyles = makeStyles((theme) => ({
  panel: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    width: '100%',
    height: '100%',
    padding: 8,
    paddingLeft: 16
  },
  speedBar: {
    padding: 16
  }
}));

const NavPanel = () => {
  const classes = useStyles();
  const {
    playerTrainStats, updateAcceleration, updateTrainStats, setBrake
  } = useGame();
  const {
    acceleration = 0,
    maxAcceleration = 0,
    brake = false,
    emergencyMode = false,
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
            <Typography>Acceleration (Q / E)</Typography>
            <SliderWithLabel
              value={acceleration}
              min={0}
              max={maxAcceleration}
              label={acceleration.toFixed(1)}
              onChange={updateAcceleration}
              step={0.05}
              suffix="kmh2"
            />
          </div>
        </Grid>
        <Grid
          item
          xs={2}
        >
          <div className={classes.speedBar}>
            <Typography>Brake (R)</Typography>
            <SwitchWithLabel
              checked={brake}
              onChange={setBrake}
            />
          </div>
        </Grid>
        <Grid
          item
          xs={2}
        >
          <div className={classes.speedBar}>
            <Typography>E-Mode (T)</Typography>
            <SwitchWithLabel
              checked={emergencyMode}
              onChange={(checked) => updateTrainStats({ emergencyMode: checked })}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NavPanel;
