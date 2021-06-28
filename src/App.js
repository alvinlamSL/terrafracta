import React from 'react';
import {
  Box,
  Container,
  makeStyles,
  ThemeProvider
} from '@material-ui/core';
import createTheme from 'src/theme';
import GameLayout from 'src/layouts/GameLayout';
import GlobalStyles from './components/GlobalStyles';
import Page from './components/Page';
import Map from './components/Map';

const useStyles = makeStyles(() => ({
  page: {
    height: '100%',
    overflow: 'hidden'
  },
  box: {
    height: '100%'
  },
  container: {
    height: '80%'
  }
}));

function App() {
  const classes = useStyles();
  const theme = createTheme({
    direction: 'ltr',
    responsiveFontSizes: true,
    theme: 'ONE_DARK'
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <GameLayout>
        <Page className={classes.page}>
          <Box className={classes.box} mt={3}>
            <Container className={classes.container}>
              <Map
                cols={100}
                rows={100}
                gridSize={10}
              />
            </Container>
          </Box>
        </Page>
      </GameLayout>
    </ThemeProvider>
  );
}

export default App;
