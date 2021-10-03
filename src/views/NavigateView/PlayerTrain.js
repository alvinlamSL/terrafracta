import React from 'react';
import PropTypes from 'prop-types';

const TrainComponent = ({ trainComponent }) => {
  const { x, y } = trainComponent;
  const trainSprite = 'sprites/trains/head.svg#head1';
  // const trainSprite = `/sprites/trains/${type}#${type}`;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <use href={trainSprite} />
    </g>
  );
};

const PlayerTrain = ({ train }) => {
  return (
    <>
      {train.map((trainComponent) => (
        <TrainComponent
          key={`${trainComponent.id}`}
          trainComponent={trainComponent}
        />
      ))}
    </>
  );
};

TrainComponent.propTypes = {
  trainComponent: PropTypes.object
};

PlayerTrain.propTypes = {
  train: PropTypes.array,
};

export default PlayerTrain;
