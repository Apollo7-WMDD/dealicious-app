import React from 'react';
import { Box, Button } from '@mui/material';

const InputButton = ({ onFirstButtonClick, onSecondButtonClick, firstButtonText, secondButtonText }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '24px 30px',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        '@media (max-width: 500px)': {
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '16px',
        },
      }}
    >
      <Button
        variant="contained"
        // disableElevation
        onClick={onFirstButtonClick}
        sx={{
          display: 'flex',
          height: '66px',
          padding: '12px 24px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          borderRadius: '8px',
          backgroundColor: '#FEFEFE !important',
          border: '3px solid #454545 !important',
          color: '#454545',
          fontSize: '24px',
          // fontFamily: 'Ubuntu',
          // fontStyle: 'normal',
          // fontWeight: 700,
          // lineHeight: '29px',
          letterSpacing: '-0.12px',
          '&:hover': {
            backgroundColor: '#FEFEFE !important',
            borderColor: '#454545 !important',
          },
        }}
      >
        {firstButtonText}
      </Button>
      <Button
        variant="contained"
        disableElevation
        onClick={onSecondButtonClick}
        sx={{
          display: 'flex',
          height: '66px',
          padding: '12px 24px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          borderRadius: '8px',
          backgroundColor: '#FF5938 !important',
          color: '#FEFEFE',
          fontSize: '24px',
          fontFamily: 'Ubuntu',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: '29px',
          letterSpacing: '-0.12px',
          '&:hover': {
            backgroundColor: '#FF5938 !important',
            borderColor: '#454545 !important',
          },
        }}
      >
        {secondButtonText}
      </Button>
    </Box>
  );
};

export default InputButton;
