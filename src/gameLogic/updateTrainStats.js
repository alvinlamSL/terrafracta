import { clamp } from 'lodash';

const updateTrainSpeed = ({
  speed,
  maxSpeed,
  acceleration,
  deccelFactor,
  totalWeight,
  brake,
  brakeDeccel
}, deltaTime) => {
  // calculate current decceleration
  const fDecceleration = speed * totalWeight * deccelFactor;
  const decceleration = Math.ceil(fDecceleration * 1000) / 1000;

  // calculate new speed
  speed = speed + (acceleration * deltaTime) - (decceleration * deltaTime);

  // if brake is on, subtract brake deccel from speed
  if (brake) { speed -= brakeDeccel * deltaTime; }

  // clamp speed between 0 and maxSpeed
  speed = clamp(speed, 0, maxSpeed);

  return { speed, decceleration };
};

const updateTrainEnergy = ({
  speed, energy, energyDrain, energyGainFactor
}, deltaTime) => {
  energy += (speed * energyGainFactor * deltaTime);
  energy -= (energyDrain * deltaTime);
  energy = clamp(energy, 0, 100);

  return { energy };
};

const updateTrainStats = (playerTrainStats, deltaTime) => {
  const newPlayerTrainStats = {
    ...playerTrainStats,
    ...updateTrainSpeed(playerTrainStats, deltaTime),
    ...updateTrainEnergy(playerTrainStats, deltaTime)
  };

  return newPlayerTrainStats;
};

export default updateTrainStats;
