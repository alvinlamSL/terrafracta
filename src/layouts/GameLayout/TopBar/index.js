import React from 'react';
import {
  makeStyles,
  Grid,
  Typography
} from '@material-ui/core';
import useGame from 'src/hooks/useGame';
import LinearProgressWithLabel from 'src/components/LinearProgressWithLabel';
import { navBarWidth, topBarHeight } from '../constants';

const useStyles = makeStyles((theme) => ({
  topBar: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    height: topBarHeight,
    paddingLeft: navBarWidth,
    width: '100%'
  },
  container: {
    padding: 8,
    marginLeft: 16
  },
  gridItem: {
    minWidth: 150,
    width: '80%'
  }
}));

const TopBar = () => {
  const classes = useStyles();
  const { playerTrainStats } = useGame();
  const {
    energy = 0,
    maxenergy = 0,
    oxygen = 0,
    maxoxygen = 0,
    speed = 0,
    decceleration,
    maxSpeed
  } = playerTrainStats || {};

  return (
    <div className={classes.topBar}>
      {playerTrainStats && (
        <Grid
          className={classes.container}
          container
          spacing={3}
        >
          <Grid
            item
            xs={4}
          >
            <div className={classes.gridItem}>
              <Typography>
                Energy
              </Typography>
              <LinearProgressWithLabel
                value={(energy / maxenergy) * 100}
                label={`${energy.toFixed(2)} / ${maxenergy}`}
                suffix=" J"
                labelMinWidth={100}
              />
              <Typography>
                Oxygen
              </Typography>
              <LinearProgressWithLabel
                value={(oxygen / maxoxygen) * 100}
                label={`${oxygen.toFixed(2)} / ${maxoxygen}`}
                suffix=" m3"
                labelMinWidth={100}
              />
            </div>
          </Grid>
          <Grid
            item
            xs={4}
          >
            <div className={classes.gridItem}>
              <Typography>
                Speed
              </Typography>
              <LinearProgressWithLabel
                value={(speed / maxSpeed) * 100}
                label={speed.toFixed(2)}
                suffix="kmh"
              />
            </div>
          </Grid>
          <Grid
            item
            xs={4}
          >
            TEST2
            {` ${decceleration}`}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default TopBar;
