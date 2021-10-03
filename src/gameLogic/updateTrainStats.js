import { clamp } from 'lodash';

const updateTrainSpeed = (playerTrainStats, deltaTime) => {
  let { speed, acceleration } = playerTrainStats;
  const {
    totalWeight, deccelFactor, maxSpeed, fuelType, brake, brakeDeccel
  } = playerTrainStats;

  // calculate current decceleration
  const fDecceleration = speed * totalWeight * deccelFactor;
  const decceleration = Math.ceil(fDecceleration * 1000) / 1000;

  // calculate new speed
  acceleration = playerTrainStats[fuelType] === 0 ? 0 : acceleration;
  speed = speed + (acceleration * deltaTime) - (decceleration * deltaTime);

  // if brake is on, subtract brake deccel from speed
  if (brake) { speed -= brakeDeccel * deltaTime; }

  // clamp speed between 0 and maxSpeed
  speed = clamp(speed, 0, maxSpeed);

  return { speed, decceleration };
};

const updateTrainEnergy = ({
  speed, energy, maxenergy, energyDrain, energyGainFactor,
  emergencyMode
}, playerTrain, deltaTime) => {
  if (emergencyMode) energyGainFactor *= 0.5;

  const trainHead = playerTrain.find((component) => component.type === 'head');
  const energyRate = trainHead.currStruct?.energyRate;
  if (energyRate && speed === 0) {
    energy += energyRate;
  }

  energy += (speed * energyGainFactor * deltaTime);
  energy -= (energyDrain * deltaTime);
  energy = clamp(energy, 0, maxenergy);

  return { energy };
};

const updateTrainOxygen = ({
  oxygen, maxoxygen, speed
}, playerTrain, deltaTime) => {
  const trainHead = playerTrain.find((component) => component.type === 'head');
  const oxygenRate = trainHead.currStruct?.oxygenRate;
  if (oxygenRate && speed === 0) {
    oxygen += oxygenRate * deltaTime;
  }

  oxygen = clamp(oxygen, 0, maxoxygen);
  return { oxygen };
};

const updateTrainFuel = (playerTrainStats, deltaTime) => {
  const { emergencyMode, acceleration, fuelDrainFactor } = playerTrainStats;
  let { fuelType } = playerTrainStats;

  if (emergencyMode) fuelType = 'energy';
  let fuel = playerTrainStats[fuelType];
  fuel -= acceleration * fuelDrainFactor * deltaTime;
  fuel = clamp(fuel, 0, playerTrainStats[`max${fuelType}`]);

  return { [fuelType]: fuel };
};

const updateTrainStats = (
  pts, // playerTrainStats
  pt, // playerTrain
  dt // deltaTime
) => {
  // newPlayerTrainStats
  let npts = {
    ...pts,
    ...updateTrainSpeed(pts, dt),
    ...updateTrainEnergy(pts, pt, dt),
    ...updateTrainOxygen(pts, pt, dt),
  };

  npts = { ...npts, ...updateTrainFuel(npts, dt) };

  return npts;
};

export default updateTrainStats;
