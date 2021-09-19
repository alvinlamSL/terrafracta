import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  LinearProgress,
  Typography
} from '@material-ui/core';

const LinearProgressWithLabel = ({
  value,
  label,
  suffix,
  ...rest
}) => {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress
          variant="determinate"
          value={value}
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

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number,
  label: PropTypes.any,
  maxValue: PropTypes.number,
  suffix: PropTypes.string
};

export default LinearProgressWithLabel;
