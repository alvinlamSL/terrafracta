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
    padding: 8
  },
  gridItem: {
    minWidth: 150,
    maxWidth: 200
  }
}));

const TopBar = () => {
  const classes = useStyles();
  const { gameState } = useGame();
  const { playerTrainStats } = gameState || {};
  const { energy, fuel } = playerTrainStats || {};

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
                variant="determinate"
                value={energy}
              />
              <Typography>
                Fuel
              </Typography>
              <LinearProgressWithLabel
                variant="determinate"
                value={fuel}
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
