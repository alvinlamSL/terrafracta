import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import useWindowSize from '../../hooks/useWindowSize';
import NavBar from './NavBar';
import TopBar from './TopBar';
import { navBarWidth, topBarHeight } from './constants';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100vh',
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    overflow: 'hidden',
    height: `calc(100% - ${topBarHeight - 10}px)`,
    paddingLeft: navBarWidth
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
      <NavBar />
      <TopBar />
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
