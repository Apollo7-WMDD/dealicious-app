import React from 'react';
import { Box, Button, Card } from '@mui/material';

const ImagePreview = ({ src, alt, width, height, onRemove }) => (
    <Card sx={{          
        borderRadius: '8px',
        border: '1px solid #454545',
        backgroundColor: '#FEFEFE',          
        marginBottom: '8px',
        marginTop: '8px',
        width: width,
        height: height,
        }}>
        <Box position="relative" width={width} height={height}>
            <Button 
                onClick={onRemove} 
                sx={{
                    position: 'absolute', 
                    top: 0, 
                    right: 0, 
                    zIndex: 1,
                    '&:hover': {
                        backgroundColor: 'transparent',
                        color: 'red',
                    },
                }}
            >
            X
            </Button>
            <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'fit' }} />
        </Box>
    </Card>
);

export default ImagePreview;
