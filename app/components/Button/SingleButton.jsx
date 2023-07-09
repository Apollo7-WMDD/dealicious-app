import React from 'react';
import { Button, Box } from '@mui/material';

const SingleButton = ({ text, onClick, width }) => {
  return (
    <Box
      component={Button}
      onClick={onClick}
      sx={{
        display: 'flex',
        height: '44px',
        width: width, 
        padding: '12px 24px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        borderRadius: '8px',
        backgroundColor: '#FF5938', 
        color: '#FEFEFE', 
        '&:hover': {
          backgroundColor: '#FF5938', 
        },
      }}
    >
      {text}
    </Box>
  );
};

export default SingleButton;
