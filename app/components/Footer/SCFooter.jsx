import React from "react";
import { Box, useTheme, Typography } from "@mui/material";
import DealIcon from "@/app/components/svg/scdealicon.svg";

function SCFooter() {
    const theme = useTheme();
  return (
    <Box
        sx={{
            bgcolor: '#474747',//theme.palette.primary[60],
            color: 'white',
            height: "78px",
            display: 'flex',
            flex: 'flex-flow',
            justifyContent: 'space-between'
        }}
    >
        <Box
        >
            <DealIcon />
            <Typography>dealicious</Typography>
        </Box>        
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 5,
        }}>            
            <Typography>CONTACT US</Typography>
            <Typography>FAQ</Typography>
            <Typography>PRIVACY POLICY</Typography>
            <Typography>TERMS OF USE</Typography>
        </Box>
    </Box>
  );
}

export default SCFooter;
