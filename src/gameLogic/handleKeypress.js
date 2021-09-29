const handleKeypress = (
  keypress,
  playerTrainStats
) => {
  switch (keypress) {
    case 'q': {
      const acceleration = playerTrainStats.acceleration - 0.05;
      return { acceleration };
    }
    case 'e': {
      const acceleration = playerTrainStats.acceleration + 0.05;
      return { acceleration };
    }
    case 'r': {
      const brake = !playerTrainStats.brake;
      return { brake };
    }
    default: return { };
  }
};

export default handleKeypress;
