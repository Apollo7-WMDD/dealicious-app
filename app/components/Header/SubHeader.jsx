import React from 'react';
import Typography from '@mui/material/Typography';

const SubHeader = ({ children, props, sx, id }) => {
 
  return (
    <Typography
      variant="h3"  id={id}
    >{props}
      {children}
    </Typography>
  );
};

export default SubHeader;
