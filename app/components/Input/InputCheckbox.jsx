import React from 'react';
import { Checkbox, FormControlLabel, Box, FormHelperText } from '@mui/material';

const InputCheckbox = ({ label, onChecked, checked, error, labelPlacement = 'end' }) => {
  const checkBoxChange = (event) => {
    if (onChecked) {
      onChecked(event.target.checked);
    }
  };

  return (
    <Box
        sx={{
        display: 'flex',
        alignItems: 'center',
        }}
    >
        <FormControlLabel
        control={
            <Checkbox
            onChange={checkBoxChange}
            checked={checked}
            sx={{
                width: '24px',
                height: '24px',
                color: error ? '#f44336' : '#181818',
                color: '#181818',
                borderRadius: '8px',
            }}
            />
        }
        label={label}
        labelPlacement={labelPlacement}
        sx={{
            marginLeft: '8px',
            gap:'8px',
            '& .MuiTypography-body1': {
            // marginRight: '8px',
            color: '#181818',
            fontSize: '20px',
            fontFamily: 'Mukta',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: '32px',
            }
        }}
        />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </Box>
  );
};

export default InputCheckbox;
