
import React from "react";
import { Box, useTheme, Typography } from "@mui/material";
import DealIcon from "@/app/components/svg/scdealicon.svg";
import { usePathname } from "next/navigation";

function NCHeader() {
  const theme = useTheme();
  const pathname = usePathname();

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
            margin: "1rem auto 1rem 2rem",
          }}
      />

    </Box>
  );
}

export default NCHeader;
