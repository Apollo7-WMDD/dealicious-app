
import React from "react";
import { Box, useTheme, Typography } from "@mui/material";
import Link from "next/link";
import DealIcon from "@/app/components/svg/scdealicon.svg";
import ScanCode from "@/app/components/svg/scanCode.svg";
import { usePathname } from "next/navigation";
import SCProfile from "@/app/components/Header/SCProfile";

function NCHeader() {
  const theme = useTheme();
  const pathname = usePathname();
  const superCustomerId = pathname.split("/")[3];

  const [age, setAge] = React.useState('');

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
