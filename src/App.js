import React from 'react';
import {
  ThemeProvider
} from '@material-ui/core';
import createTheme from 'src/theme';
import GameLayout from 'src/layouts/GameLayout';
import GlobalStyles from './components/GlobalStyles';
import { GameProvider } from './contexts/GameContext';
import NavigateView from './views/NavigateView';

function App() {
  const theme = createTheme({
    direction: 'ltr',
    responsiveFontSizes: true,
    theme: 'ONE_DARK'
  });

  return (
    <ThemeProvider theme={theme}>
      <GameProvider>
        <GlobalStyles />
        <GameLayout>
          <NavigateView />
        </GameLayout>
      </GameProvider>
    </ThemeProvider>
  );
}

export default App;
