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
  speed, energy, maxEnergy, energyDrain, energyGainFactor
}, playerTrain, deltaTime) => {
  const trainHead = playerTrain.find((component) => component.type === 'head');
  const energyRate = trainHead.currStruct?.energyRate;
  if (energyRate && speed === 0) {
    energy += energyRate;
  }

  energy += (speed * energyGainFactor * deltaTime);
  energy -= (energyDrain * deltaTime);
  energy = clamp(energy, 0, maxEnergy);

  return { energy };
};

const updateTrainOxygen = ({
  oxygen, maxOxygen, speed, acceleration,
  fuelType, fuelDrainFactor
}, playerTrain, deltaTime) => {
  const trainHead = playerTrain.find((component) => component.type === 'head');
  const oxygenRate = trainHead.currStruct?.oxygenRate;
  if (oxygenRate && speed === 0) {
    oxygen += oxygenRate;
  }

  if (fuelType === 'oxygen') {
    oxygen -= (acceleration * fuelDrainFactor * deltaTime);
  }

  oxygen = clamp(oxygen, 0, maxOxygen);
  return { oxygen };
};

const updateTrainStats = (playerTrainStats, playerTrain, deltaTime) => {
  const newPlayerTrainStats = {
    ...playerTrainStats,
    ...updateTrainSpeed(playerTrainStats, deltaTime),
    ...updateTrainEnergy(playerTrainStats, playerTrain, deltaTime),
    ...updateTrainOxygen(playerTrainStats, playerTrain, deltaTime)
  };

  return newPlayerTrainStats;
};

export default updateTrainStats;
