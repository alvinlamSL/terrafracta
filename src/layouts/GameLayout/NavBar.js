import React from 'react';
import { Drawer, makeStyles } from '@material-ui/core';
import { navBarWidth } from './constants';

const useStyles = makeStyles(() => ({
  drawer: {
    width: navBarWidth
  },
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      open
      variant="persistent"
    >
      TEST
    </Drawer>
  );
};

export default NavBar;
