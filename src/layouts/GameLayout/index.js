import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import useWindowSize from '../../hooks/useWindowSize';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    paddingLeft: 256
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const minWidth = 500;
const minHeight = 500;

const GameLayout = ({ children }) => {
  const classes = useStyles();

  const windowSize = useWindowSize();
  const layoutHeight = Math.max(windowSize.height, minHeight);
  const layoutWidth = Math.max(windowSize.width, minWidth);

  return (
    <div
      className={classes.root}
      style={{
        height: layoutHeight,
        width: layoutWidth
      }}
    >
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

GameLayout.propTypes = {
  children: PropTypes.node
};

export default GameLayout;
