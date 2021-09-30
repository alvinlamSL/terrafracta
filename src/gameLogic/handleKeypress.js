import { clamp } from 'lodash';

const handleKeypress = (
  keypress,
  playerTrainStats
) => {
  switch (keypress) {
    case 'q': {
      const { maxAcceleration } = playerTrainStats;
      let { acceleration } = playerTrainStats;
      acceleration = clamp(acceleration - 0.05, 0, maxAcceleration);
      return { acceleration };
    }
    case 'e': {
      const { maxAcceleration } = playerTrainStats;
      let { acceleration } = playerTrainStats;
      acceleration = clamp(acceleration + 0.05, 0, maxAcceleration);
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
