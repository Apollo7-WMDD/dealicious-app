import React from 'react';
import Typography from '@mui/material/Typography';

const SubHeader = ({ children, props }) => {
 
  return (
    <Typography
      variant="h3"    
    >{props}
      {children}
    </Typography>
  );
};

export default SubHeader;
