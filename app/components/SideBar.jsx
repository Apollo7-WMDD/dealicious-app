"use client";

import { useMemo  } from 'react';
import Image from "next/image";
import {
  Box,
  Drawer,
  Typography,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useStore } from "../store.js";
import SideBarItem from "./SideBarItem.jsx";
import { useTheme } from "@mui/material";

function SideBar(
    ) {
  
  const {  isSidebarOpen } = useStore();
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const shadowColor = `${theme.palette.neutral[20]}1f`;
  return (
    <>
      <Box
        sx={{
          // position: "static",
          background: "none",
          boxShadow: "none",
          display: "flex",
        }}
      >
        {isNonMobile && (
          <Drawer
            open={isSidebarOpen}
            // open={true} //change this to use isSidebarOpen
            // onClose={() => setIsSidebarOpen(false)}
            variant="persistent"
            anchor="left"
            // transitionDuration={{
            //     enter: 10000,
            //     exit: 10000,
            // }}
            sx={{
              width: "250px",
              height: "100%",
              minHeight: "100vh",
              boxShadow: `4px 4px 20px ${shadowColor}`,
              "& .MuiDrawer-paper": {
                
                padding: "2rem 0",
                color: theme.palette.neutral[20],
                background: theme.palette.background.alt,
                boxSizing: "border-box",
                // borderWidth: isNonMobile ? 0 : "2px",
                width: "250px",
              },
            }}
          >
        
        <Box>
              <Image
                src="/logo.png"
                alt="logo"
                width={100}
                height={100}
                style={{ margin: "0 auto" }}
              />
          <SideBarItem />

              <Box
                sx={{
                  backgroundColor: theme.palette.secondary[60],
                  borderRadius: "1rem 1rem 1rem 1rem",
                  textAlign: "center",
                  margin: "4rem 2rem",
                  padding: "2rem 0",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Today
                </Typography>
                <br />
                <Typography variant="h5">Revenue</Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  $$$
                </Typography>
                <Typography variant="h5">Customers</Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  $$$
                </Typography>
              </Box>
            </Box>
          </Drawer>
        )}
        
      </Box>
    </>
  );
}

export default SideBar;
