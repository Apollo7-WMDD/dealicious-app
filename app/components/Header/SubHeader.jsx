import React from 'react';
import Typography from '@mui/material/Typography';
// import { useTheme } from "@mui/material";


const SubHeader = ({ children, props }) => {
 
//  const theme = useTheme();
  return (
    <Typography
      variant="h3"
      // sx={{
      //   color: '#000',
      //   fontSize: { xs: '28px' },
      //   fontFamily: 'Ubuntu',
      //   fontStyle: 'normal',
      //   fontWeight: 700,
      //   lineHeight: '34px',
      // }}
      
    >{props}
      {children}
    </Typography>
  );
};

export default SubHeader;
