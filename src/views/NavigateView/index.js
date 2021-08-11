import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  makeStyles,
} from '@material-ui/core';
import useWindowSize from 'src/hooks/useWindowSize';
import Page from 'src/components/Page';
import NavigateMap from './NavigateMap';

const useStyles = makeStyles(() => ({
  page: {
    height: '100%',
    overflow: 'hidden'
  },
  box: {
    marginTop: '0',
    height: '100%'
  },
  innerContainer: {
    width: '100%',
    height: '100%'
  },
  container: {
    height: '100%',
    background: 'green'
  }
}));

const NavigateView = () => {
  const classes = useStyles();
  const containerRef = useRef(null);
  const windowSize = useWindowSize();
  const [size, setSize] = useState({ width: 0, height: 0 });

  // The ref has to be checked in useEffect since the
  // ref is not set on first render and useEffect is called
  // only AFTER first render
  useEffect(() => {
    console.log(containerRef.current.offsetWidth);
    const { offsetWidth, offsetHeight } = containerRef.current;
    setSize({ width: offsetWidth, height: offsetHeight });
  }, [windowSize]);

  return (
    <Page className={classes.page}>
      <Box className={classes.box} mt={3}>
        <Container className={classes.container}>
          <div
            className={classes.innerContainer}
            ref={containerRef}
          >
            <NavigateMap
              width={size.width}
              height={size.height}
            />
          </div>
        </Container>
      </Box>
    </Page>
  );
};

export default NavigateView;
