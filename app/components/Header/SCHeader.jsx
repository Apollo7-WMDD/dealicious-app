
import React from "react";
import { Box, useTheme, Typography } from "@mui/material";
import Link from "next/link";
import DealIcon from "@/app/components/svg/scdealicon.svg";
import ScanCode from "@/app/components/svg/scanCode.svg";
import { usePathname } from "next/navigation";
import SCProfile from "@/app/components/Header/SCProfile";

function SCHeader() {
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
          <Link 
            underline="none"
            style={{ 
              textDecoration: "none",
              '&:visited': {
              textDecoration: 'none', // Text decoration for visited links
              // Add any additional styles for visited links if needed
              },
            }}
            href={`/superCustomer/restaurants/${superCustomerId}`}>
            <Typography 
              variant="p"
            >My Restaurants</Typography>
          </Link>
        </Box>
        <Box>
          <SCProfile />
        </Box>
      </Box>

    </Box>
  );
}

export default SCHeader;
