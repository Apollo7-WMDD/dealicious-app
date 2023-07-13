import React, { useRef } from 'react';
import { Card, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const PictureUploadCard = ({ phrase, onCardClick, sx}) => {
  const inputRef = useRef();

  const cardClick = () => {
    inputRef.current.click();
  };

  const fileUpload = (e) => {
    if (onCardClick) {
      onCardClick(e.target.files[0]);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center'}}>
      <Card
        sx={{
          display: 'flex',
          padding: '16px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          flex: '1 0 0',
          alignSelf: 'stretch',
          borderRadius: '8px',
          border: '1px solid #454545',
          backgroundColor: '#FEFEFE',
          cursor: 'pointer',
          marginTop: '10px',
          width: { xs: '250px', md: '280px', aspectRatio: 'none' },
          height: { xs: '76px'},
          marginBottom: '8px',
          marginTop: '8px',
          ...sx
        }}
        onClick={cardClick}
      >
        <input
          type="file"
          ref={inputRef}
          style={{ display: 'none' }}
          onChange={fileUpload}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#FF5938',
            fontSize: '16px',
            fontFamily: 'Mukta',
            fontStyle: 'normal',
            fontWeight: 600,
          }}
        >
          <AddIcon color="inherit" />
          <span>{phrase}</span>
        </Box>
      </Card>
    </Box>
  );
};

export default PictureUploadCard;
