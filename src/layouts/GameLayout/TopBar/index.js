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
    fuel = 0,
    speed = 0,
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
                value={energy}
                label={energy.toFixed(2)}
                labelMinWidth={50}
              />
              <Typography>
                Fuel
              </Typography>
              <LinearProgressWithLabel
                value={fuel}
                label={fuel.toFixed(2)}
                labelMinWidth={50}
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
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default TopBar;
