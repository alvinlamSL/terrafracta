import React, {
  createContext,
  useEffect,
  useReducer,
  useState
} from 'react';
import PropTypes from 'prop-types';
import initialiseGame from 'src/gameLogic/initialiseGame';
import moment from 'moment';
import gameLoop from 'src/gameLogic/gameLoop';
import handleKeypress from 'src/gameLogic/handleKeypress';

let mounted = true;
const initialGameState = {
  gridSize: 16,
  gameMap: {
    cols: 50,
    rows: 40,
    tiles: []
  },
  playerTrainStats: { },
  playerTrain: [],
  isDead: false,
  initialised: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALISE': {
      const { gameMap, gameState } = action.payload;
      gameState.initialised = true;
      gameState.isDead = false;
      return { ...state, gameMap, ...gameState };
    }
    case 'RESTART_GAME': {
      return { ...state, initialised: false };
    }
    case 'UPDATE_GAME_LOOP': {
      const { deltaTime } = action.payload;
      const gameState = gameLoop(state, deltaTime);
      return { ...state, ...gameState };
    }
    case 'UPDATE_TRAIN_STATS': {
      const newPlayerTrainStats = {
        ...state.playerTrainStats,
        ...action.payload
      };
      return { ...state, playerTrainStats: newPlayerTrainStats };
    }
    case 'HANDLE_KEYPRESS': {
      const { keypress } = action.payload;
      const playerTrainStats = {
        ...state.playerTrainStats,
        ...handleKeypress(keypress, state.playerTrainStats)
      };
      return { ...state, playerTrainStats };
    }
    default: {
      return { ...state };
    }
  }
};

const GameContext = createContext({
  ...initialGameState,
  updateAcceleration: () => { },
  updateTrainStats: () => { },
  setBrake: () => { },
  restartGame: () => { }
});

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialGameState);
  const [loopTime, setLoopTime] = useState(moment());
  const { initialised, isDead } = state;

  useEffect(() => {
    // initialise the game here
    // this is done ONCE only
    if (!initialised) {
      // create an async init function
      // (cause the useEffect function itself CANNOT be async)
      const mInitialiseGame = async () => {
        const { gameMap, gameState } = await initialiseGame(state.gridSize);
        dispatch({
          type: 'INITIALISE',
          payload: { gameMap, gameState }
        });
      };

      mInitialiseGame(); // init the game first
    }

    const mGameLoop = (timestamp) => {
      const newLoopTime = moment(timestamp);
      if (initialised && !isDead) {
        const deltaTime = (newLoopTime - loopTime) / 1000; // delta time in seconds
        dispatch({
          type: 'UPDATE_GAME_LOOP',
          payload: { deltaTime }
        });
      }

      if (mounted) setLoopTime(newLoopTime);
    };

    window.requestAnimationFrame(mGameLoop);
  }, [loopTime]);

  // Use this for actions that should only be done ONCE
  useEffect(() => {
    window.addEventListener('keypress', (event) => {
      dispatch({
        type: 'HANDLE_KEYPRESS',
        payload: { keypress: event.key }
      });
    });
    return () => { mounted = false; };
  }, []);

  const updateAcceleration = (acceleration) => dispatch({
    type: 'UPDATE_TRAIN_STATS',
    payload: { acceleration }
  });

  const updateTrainStats = (stats) => dispatch({
    type: 'UPDATE_TRAIN_STATS',
    payload: stats
  });

  const setBrake = (brake) => dispatch({
    type: 'UPDATE_TRAIN_STATS',
    payload: { brake }
  });

  const restartGame = () => dispatch({ type: 'RESTART_GAME' });

  return (
    <GameContext.Provider
      value={{
        ...state,
        updateAcceleration,
        updateTrainStats,
        setBrake,
        restartGame
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.array
};

export default GameContext;
