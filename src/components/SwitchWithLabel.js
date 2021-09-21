import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControlLabel,
  FormGroup,
  Switch
} from '@material-ui/core';

const SwitchWithLabel = ({
  checked,
  label,
  onChange,
  ...rest
}) => {
  return (
    <FormGroup>
      <FormControlLabel
        label={label}
        onChange={(event) => onChange(event.target.checked)}
        control={
          <Switch checked={checked} />
        }
        {...rest}
      />
    </FormGroup>
  );
};

SwitchWithLabel.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func
};

export default SwitchWithLabel;
