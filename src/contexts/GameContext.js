import React, {
  createContext,
  useEffect,
  useReducer,
  useState
} from 'react';
import PropTypes from 'prop-types';
import initialiseGame from 'src/gameLogic/initialiseGame';
import updatePlayerTrain from 'src/gameLogic/updatePlayerTrain';
import moment from 'moment';

const initialGameState = {
  gridSize: 16,
  gameMap: {
    cols: 50,
    rows: 40,
    tiles: []
  },
  gameState: { }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALISE': {
      const { gameMap, gameState } = action.payload;
      return { ...state, gameMap, gameState };
    }
    case 'UPDATE_TRAIN_MOVE': {
      const { gameState } = action.payload;
      return { ...state, gameState };
    }
    default: {
      return { ...state };
    }
  }
};

const GameContext = createContext({
  ...initialGameState
});

// This is the game loop, the game mechanics
// are all controlled from here
const gameLoop = (state, deltaTime) => {
  const { gameMap, gameState, gridSize } = state;
  const { playerTrain, playerTrainStats } = gameState;
  const { speed } = playerTrainStats;

  const newGameState = {
    ...gameState,
    playerTrain: updatePlayerTrain(
      deltaTime,
      speed,
      playerTrain,
      gridSize,
      gameMap
    )
  };
  return { gameState: newGameState };
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialGameState);
  // const [loopStart, setLoop] = useState(false);
  const [loopTime, setLoopTime] = useState(moment());

  useEffect(() => {
    // initialise the game here
    // this is done ONCE only
    if (!state.gameState.playerTrain) {
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

    const mGameLoop = () => {
      // TODO: I'm using "playerTrain" to determine whether the game has init
      // (should this change?)
      const newLoopTime = moment();
      if (state.gameState.playerTrain) {
        const deltaTime = (newLoopTime - loopTime) / 1000; // delta time in seconds
        const { gameState } = gameLoop(state, deltaTime);
        dispatch({
          type: 'UPDATE_TRAIN_MOVE',
          payload: { gameState }
        });
      }
      setLoopTime(newLoopTime);
    };

    setTimeout(mGameLoop, 200);
  }, [loopTime]);

  return (
    <GameContext.Provider
      value={{
        ...state,
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
