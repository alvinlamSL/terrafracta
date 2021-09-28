// This function fetches the game map from the public folder
const initialiseGameMap = async () => {
  const dataFetch = fetch('data/maps/map3.json').then((res) => (
    res.json()
  ));
  const data = await dataFetch;
  return data;
};

export default initialiseGameMap;
