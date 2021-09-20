import { clamp } from 'lodash';

const updateTrainSpeed = ({
  speed,
  maxSpeed,
  acceleration,
  totalWeight
}, deltaTime) => {
  // calculate current decceleration
  const deccelFactor = 0.01;
  const fDecceleration = speed * totalWeight * deccelFactor;
  const decceleration = Math.ceil(fDecceleration * 1000) / 1000;

  // calculate new speed
  speed = speed + (acceleration * deltaTime) - (decceleration * deltaTime);

  // clamp speed between 0 and maxSpeed
  speed = clamp(speed, 0, maxSpeed);

  return { speed, decceleration };
};

const updateTrainStats = (playerTrainStats, deltaTime) => {
  const newPlayerTrainStats = {
    ...playerTrainStats,
    ...updateTrainSpeed(playerTrainStats, deltaTime)
  };

  return newPlayerTrainStats;
};

export default updateTrainStats;
