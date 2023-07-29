import React from 'react';
import { Box, Button, useTheme } from '@mui/material';

const InputButton = ({ onFirstButtonClick, onSecondButtonClick, firstButtonText, secondButtonText }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '24px 30px',
        margin: '20px',
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
          height: '44px',
          padding: '12px 24px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          borderRadius: '8px',
          border: '3px solid #454545 !important',
          color: '#454545',
          fontSize: '20px',
          fontFamily: 'Ubuntu',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: '24px',
          letterSpacing: '-0.12px',
          backgroundColor: '#FEFEFE !important',
          '&:hover': {
            backgroundColor: '#454545 !important',
            borderColor: '#454545 !important',
            color: '#FEFEFE !important',
          },
          '@media (max-width: 500px)': {
            width: '100%'
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
          height: '44px',
          padding: '12px 24px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          borderRadius: '8px',
          color: '#FEFEFE',
          fontSize: '20px',
          fontFamily: 'Ubuntu',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: '24px',
          letterSpacing: '-0.12px',
          backgroundColor: theme.palette.primary[80],
          ":hover": {
            backgroundColor: "#FF2D2D",
            borderColor: '#454545 !important',
            boxShadow: "none",
          },
          '@media (max-width: 500px)': {
            width: '100%'
          },
        }}
      >
        {secondButtonText}
      </Button>
    </Box>
  );
};

export default InputButton;
