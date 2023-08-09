import React, { useState } from "react";
import { Box, useTheme, Typography } from "@mui/material";
import Link from "next/link";
import DealIcon from "@/app/components/svg/scdealicon.svg";
import ScanCode from "@/app/components/svg/scanCode.svg";
import { usePathname } from "next/navigation";
import SCProfile from "@/app/components/Header/SCProfile";
import { Sling as Hamburger } from 'hamburger-react';

function SCHeader() {
  const theme = useTheme();
  const pathname = usePathname();
  const superCustomerId = pathname.split("/")[3];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          m:"1rem 2rem",
        }}
      >
        {/* <Box
          sx={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            gap:'0.5rem',

            '@media (max-width: 800px)': {
              display: 'none',
            },
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
        </Box> */}
        <Box
          sx={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            gap:'0.5rem',

            '@media (max-width: 800px)': {
              display: 'none',
            },
          }}
        >
          <Link 
            underline="none"
            style={{ 
              textDecoration: "none",
              '&:visited': {
              textDecoration: 'none',
              },
            }}
            href={`/superCustomer/restaurants/${superCustomerId}`}>
            <Typography 
              variant="p"
              sx={{
                color:'#000000',
              }}
            >My Restaurants</Typography>
          </Link>
        </Box>
        <Box
          sx={{
            '@media (max-width: 800px)': {
              display: 'none',
            },
          }}
        >
          <SCProfile />
        </Box>
        <Box
          sx={{
            display:'none',

            '@media (max-width: 800px)': {
              display: 'flex',
            },
          }}
        >
          <Hamburger
            color={theme.palette.primary[80]} 
            toggled={isMenuOpen}
            toggle={setIsMenuOpen}
          />
          {isMenuOpen && (
            <Box
              sx={{
                position: "absolute",
                top: "78px",
                right: "0",
                backgroundColor: "#ffffff",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                padding: "1rem",
              }}
            >
              <Box>
                <Link
                  underline="none"
                  style={{
                    textDecoration: "none",
                    "&:visited": {
                      textDecoration: "none",
                    },
                  }}
                  href={`/superCustomer/restaurants/${superCustomerId}`}
                >
                  <Typography 
                    sx={{
                      color:'#000000',
                    }}
                    variant="p">My Restaurants</Typography>
                </Link>
              </Box>
              <Box
                sx={{
                  display:'flex',
                  flexDirection:'row',
                  alignItems:'center',
                  gap:'0.5rem',
                }}
              >
                <Typography variant="p">Scan the Code</Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

    </Box>
  );
}

export default SCHeader;
