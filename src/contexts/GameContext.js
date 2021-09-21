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
  initialised: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALISE': {
      const { gameMap, gameState } = action.payload;
      gameState.initialised = true;
      return { ...state, gameMap, ...gameState };
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
    case 'UPDATE_TRAIN_ACCEL': {
      const playerTrainStats = {
        ...state.playerTrainStats,
        ...action.payload
      };
      return { ...state, playerTrainStats };
    }
    default: {
      return { ...state };
    }
    case 'SET_TRAIN_BRAKE': {
      const { brake } = action.payload;
      const newGameState = { ...state.gameState };
      const newPlayerTrainStats = { ...newGameState.playerTrainStats };
      newPlayerTrainStats.brake = brake;
      newGameState.playerTrainStats = newPlayerTrainStats;
      return { ...state, gameState: newGameState };
    }
  }
};

const GameContext = createContext({
  ...initialGameState,
  updateAcceleration: () => { },
  setBrake: () => { }
});

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialGameState);
  const [loopTime, setLoopTime] = useState(moment());

  useEffect(() => {
    // initialise the game here
    // this is done ONCE only
    if (!state.initialised) {
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
      if (state.initialised) {
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

  useEffect(() => () => { mounted = false; }, []);

  const updateAcceleration = (acceleration) => dispatch({
    type: 'UPDATE_TRAIN_STATS',
    payload: { acceleration }
  });

  const setBrake = (brake) => dispatch({
    type: 'UPDATE_TRAIN_STATS',
    payload: { brake }
  });

  return (
    <GameContext.Provider
      value={{
        ...state,
        updateAcceleration,
        setBrake,
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
