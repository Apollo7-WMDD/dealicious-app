import React from 'react';
import { Typography } from '@mui/material';

const InputValue = ({ text }) => (
  <Typography 
    variant="body1" 
    sx={{
      color: (theme) => theme.palette.background.alt,
      fontFamily: 'Mukta',
      fontSize: '20px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '32px',
      textAlign:'left',
    }}
  >
    {text}
  </Typography>
);

export default InputValue;
