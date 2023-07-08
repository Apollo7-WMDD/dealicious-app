import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';

const InputText = ({ label, value, onChange, name, id, placeholder, type = 'text', ...props }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '326px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flexShrink: 0,
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
        <TextField
          type={type}
          value={value}
          onChange={onChange}
          name={name}
          id={id}
          placeholder={placeholder}
          variant="outlined"
          fullWidth
          InputProps={{
            sx: {
              height: '44px',
              alignItems: 'center',
              borderRadius: '8px',
              border: '1px solid #454545',
              background: '#FEFEFE',
            },
            inputProps: {
              style: {
                color: '#454545',
                fontSize: '20px',
                fontFamily: 'Mukta',
                fontStyle: 'normal',
                fontWeight: 300,
                lineHeight: '28px',
              },
            },
          }}
          {...props}
        />
      </Box>
    </Box>
  );
};

export default InputText;