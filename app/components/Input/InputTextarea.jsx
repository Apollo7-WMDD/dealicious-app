import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const InputTextarea = ({ label, value, onChange, name, id, placeholder, type = 'text', ...props }) => {
  return (
    <Box
      sx={{
        display: 'flex',
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
          <Typography
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
          </Typography>
        )}
        <TextField
            type={type}
            value={value}
            onChange={onChange}
            name={name}
            id={id}
            placeholder={placeholder}
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            InputProps={{
                sx: {
                alignItems: 'center',
                borderRadius: '8px',
                border: '1px solid #454545',
                background: '#FEFEFE',
                "& .MuiOutlinedInput-notchedOutline": {
                    border: 'none'
                }
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

export default InputTextarea;
