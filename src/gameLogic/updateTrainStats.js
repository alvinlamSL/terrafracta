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

const updateTrainFuel = ({
  fuel, speed, acceleration, fuelDrainFactor
}, playerTrain, deltaTime) => {
  const trainHead = playerTrain.find((component) => component.type === 'head');
  const fuelRate = trainHead.currStruct?.fuelRate;
  if (fuelRate && speed === 0) {
    fuel += trainHead.currStruct.fuelRate;
  }

  fuel -= (acceleration * fuelDrainFactor * deltaTime);
  fuel = clamp(fuel, 0, 100);

  return { fuel };
};

const updateTrainStats = (playerTrainStats, playerTrain, deltaTime) => {
  const newPlayerTrainStats = {
    ...playerTrainStats,
    ...updateTrainSpeed(playerTrainStats, deltaTime),
    ...updateTrainEnergy(playerTrainStats, deltaTime),
    ...updateTrainFuel(playerTrainStats, playerTrain, deltaTime)
  };

  return newPlayerTrainStats;
};

export default updateTrainStats;
