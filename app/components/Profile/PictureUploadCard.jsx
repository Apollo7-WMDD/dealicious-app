import React from 'react';
import { Card, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const PictureUploadCard = ({ phrase, onCardClick }) => {
    const handleCardClick = () => {
        if (onCardClick) {
            onCardClick();
        }
    };

    return (
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
          }}
          onClick={handleCardClick}
        >
        <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: '#FF5938',
            fontSize: '16px',
            fontFamily: 'Mukta',
            fontStyle: 'normal',
            fontWeight: 600, }}>
            <AddIcon color="inherit" />
            <span>{phrase}</span>
        </Box>
        </Card>
    );
};

export default PictureUploadCard;
