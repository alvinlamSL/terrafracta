import React from 'react';
import {
  Box,
  Container,
  makeStyles,
} from '@material-ui/core';
import Page from 'src/components/Page';
import NavigateMap from './NavigateMap';
import NavPanel from './NavPanel';
import CommsDialog from './CommsDialog';

const useStyles = makeStyles(() => ({
  page: {
    height: '100%',
    overflow: 'hidden'
  },
  box: {
    marginTop: '0',
    height: 'calc(100% - 256px)'
  },
  container: {
    height: '100%',
  }
}));

const NavigateView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.page}>
      <CommsDialog />
      <Box className={classes.box} mt={3}>
        <Container className={classes.container}>
          <NavigateMap />
        </Container>
        <NavPanel />
      </Box>
    </Page>
  );
};

export default NavigateView;
