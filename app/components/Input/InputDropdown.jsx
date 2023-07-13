import React from 'react';
import { Select, MenuItem, InputLabel, Box, IconButton } from '@mui/material';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

const InputDropdown = ({ label, value, onChange, name, id, placeholder, options, ...props }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '260px',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flexShrink: 0,
        marginBottom: '8px',
        marginTop: '8px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'stretch',
        }}
      >
        {label && (
          <InputLabel
            htmlFor={id}
            sx={{
              color: '#181818',
              fontSize: '20px',
              fontFamily: 'Mukta',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: '32px',
            }}
          >
            {label}
          </InputLabel>
        )}
        <Select
          label={label}
          value={value}
          onChange={onChange}
          name={name}
          id={id}
          placeholder={placeholder}
          fullWidth
          endIcon={
            <IconButton>
              <KeyboardArrowDown />
            </IconButton>
          }
          sx={{
            height: '44px',
            alignItems: 'center',
            borderRadius: '8px',
            border: '1px solid #454545',
            background: '#FEFEFE',
            "& .MuiOutlinedInput-notchedOutline": {
              border: 'none'
            }
          }}
          {...props}
        >
        <MenuItem value="" disabled>
            <em>{placeholder}</em>
        </MenuItem>
        {options?.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
        </Select>
      </Box>
    </Box>
  );
};

export default InputDropdown;

