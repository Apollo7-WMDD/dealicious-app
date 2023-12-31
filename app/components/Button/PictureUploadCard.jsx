import React, { useRef, useState } from 'react';
import { Card, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const PictureUploadCard = ({ phrase, onFileSelected, sx}) => {
  const inputRef = useRef();

  const cardClick = () => {
    inputRef.current.click();
  };

  const fileUpload = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      onFileSelected(files);
    }
  };  
  

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
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
          multiple
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
