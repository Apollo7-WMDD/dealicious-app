import React from 'react';
import Box from '@mui/material/Box';

const Form = ({ children, ...props }) => {
  return (
    <Box
      component="section"
      sx={{
        borderRadius: '8px',
        background: '#FEFEFE',
        boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.25)',
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Form;
