import React from 'react';
import { Checkbox, FormControlLabel, Box } from '@mui/material';

const InputCheckbox = ({ label, onChecked, labelPlacement = 'end' }) => {
  const handleCheckboxChange = (event) => {
    if (event.target.checked && onChecked) {
      onChecked();
    }
  };

  return (
    <Box
        sx={{
        display: 'flex',
        // padding: '8px',
        alignItems: 'center',
        }}
    >
        <FormControlLabel
        control={
            <Checkbox
            onChange={handleCheckboxChange}
            sx={{
                width: '24px',
                height: '24px',
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
            fontSize: '16px',
            fontFamily: 'Mukta',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: '32px',
            }
        }}
        />
    </Box>
  );
};

export default InputCheckbox;
