
import React from "react";
import { Box, useTheme, Typography } from "@mui/material";

import DealIcon from "@/app/components/svg/scdealicon.svg";
import ScanCode from "@/app/components/svg/scanCode.svg";

function SCHeader() {
  const theme = useTheme();
  return (
    <Box
      sx={{

          borderBottom: '3px solid',
          borderColor: theme.palette.primary[80],
          height: "78px",
          display:'flex',
          flexDirection:'row',
          alignItems:'center',
      }}
    >
      <DealIcon 
          width={50}
          height={50}
          style={{ 
            margin: "1rem auto 1rem 1rem",
          }}
      />
      <Box
        sx={{
          display:'flex',
          flexDirection:'row',
          alignItems:'center',
          gap:'3rem',
          m:"1rem 5rem"
        }}
      >
        <Box
          sx={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            gap:'0.5rem'
          }}
        >
          <ScanCode
            width={20}
            height={20}
            style={{ 
              margin: "0",
            }}
          />
          <Typography variant="p">Scan the Code</Typography>
        </Box>
        <Box
          sx={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            gap:'0.5rem'
          }}
        >
          <Typography variant="p">My Restaurants</Typography>
        </Box>
      </Box>

    </Box>
  );
}

export default SCHeader;
