import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  LinearProgress,
  Typography
} from '@material-ui/core';

const LinearProgressWithLabel = ({ value, ...rest }) => {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...rest} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number
};

export default LinearProgressWithLabel;
