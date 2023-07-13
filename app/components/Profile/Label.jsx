import React from 'react';
import { Typography } from '@mui/material';

const Label = ({ text }) => (
  <Typography 
    variant="body1" 
    sx={{
      color: (theme) => theme.palette.neutral[40],
      fontFamily: 'Mukta',
      fontSize: '20px',
      fontStyle: 'normal',
      fontWeight: 300,
      lineHeight: '28px',
      textAlign:'left',
    }}
  >
    {text}
  </Typography>
);

export default Label;
