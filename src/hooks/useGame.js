import { useContext } from 'react';
import GameContext from 'src/contexts/GameContext';

const useGame = () => useContext(GameContext);

export default useGame;
