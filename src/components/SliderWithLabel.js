import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Slider,
  Typography
} from '@material-ui/core';

const SliderWithLabel = ({
  value,
  label,
  onChange,
  min,
  max,
  suffix,
  ...rest
}) => {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <Slider
          defaultValue={0}
          step={0.1}
          value={value}
          marks
          min={min || 0}
          max={max || 100}
          valueLabelDisplay="off"
          onChange={(event, newValue) => onChange(newValue)}
          {...rest}
        />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">
          {label && `${label}${suffix || '%'}`}
          {!label && `${value}${suffix || '%'}`}
        </Typography>
      </Box>
    </Box>
  );
};

SliderWithLabel.propTypes = {
  value: PropTypes.number,
  label: PropTypes.string,
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  suffix: PropTypes.string
};

export default SliderWithLabel;
