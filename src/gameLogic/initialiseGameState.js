// This function fetches the game data
const initialiseGameState = async () => {
  const dataFetch = fetch('data/gameStates/default.json').then((res) => (
    res.json()
  ));
  const data = await dataFetch;
  return data;
};

export default initialiseGameState;
