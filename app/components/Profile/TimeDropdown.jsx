import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const TimeDropdown = ({ day, setBusinessHours, isDisabled }) => {
  const [openAt, setOpenAt] = useState('');
  const [closeAt, setCloseAt] = useState('');

  const hours = Array.from({length: 12}, (_, i) => i + 1);
  const periods = ['AM', 'PM'];

  const options = periods.flatMap(period => 
    hours.map(hour => ({
      value: `${hour}:00 ${period}`,
      label: `${hour}:00 ${period}`,
    }))
  );

  const openTime = (e) => {
    setOpenAt(e.target.value);
    setBusinessHours({ open: e.target.value, close: closeAt });
  };

  const closeTime = (e) => {
    setCloseAt(e.target.value);
    setBusinessHours({ open: openAt, close: e.target.value });
  };


  return (
    <div>
      <FormControl sx={{width: { xs: '155px', md: '279px' }, marginRight: '20px'}} size="small" disabled={isDisabled}>
        <InputLabel id={`${day}-open-at-label`}>Open At</InputLabel>
        <Select
          labelId={`${day}-open-at-label`}
          id={`${day}-open-at`}
          value={openAt}
          label="Open At"
          onChange={openTime}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{width: { xs: '155px', md: '279px' }}} size="small" disabled={isDisabled}>
        <InputLabel id={`${day}-close-at-label`}>Close At</InputLabel>
        <Select
          labelId={`${day}-close-at-label`}
          id={`${day}-close-at`}
          value={closeAt}
          label="Close At"
          onChange={closeTime}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
export default TimeDropdown;
