"use client";

import Image from "next/image";
import { Box, Drawer, Typography, Divider } from "@mui/material";

import { useMediaQuery } from "@mui/material";
import { useStore } from "../../../lib/context/sidebar_context/store.js";
import SideBarItem from "./SideBarItem.jsx";
import SideBarItemMobile from "./SideBarItemMobile.jsx";
import SideBarUtilButton from "./SideBarUtilButton.jsx";
import { useTheme } from "@mui/material";
import TodayInfo from "./TodayInfo.jsx";

function SideBar() {
  const { isSidebarOpen } = useStore();
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const shadowColor = `${theme.palette.neutral[20]}1f`;

  return (
    <>
      {isNonMobile ? (
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
              color: theme.palette.background.alt,
              background: theme.palette.background.default,
              boxSizing: "border-box",
              // borderWidth: isNonMobile ? 0 : "2px",
              width: "250px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column ",
              justifyContent: "space-between",
              height: "100%",
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
              <Divider style={{ margin: "1rem 2rem" }} />
              <SideBarItem />
              <TodayInfo />
            </Box>

            <SideBarUtilButton />
          </Box>
        </Drawer>
      ) : (
        <Box
          sx={{
            display: "block",
            position: "fixed",
            bottom: "0",
            height: "80px",
            borderRadius: "8px",
            // backgroundColor: theme.palette.primary[100],
            backgroundColor: theme.palette.background.default,
            boxShadow: `0px -4px 20px ${shadowColor}`,
            width: "100%",
            zIndex: "100",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column ",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Box  >
            
              <SideBarItemMobile />
            
            </Box>

            {/* <SideBarUtilButton /> */}
          </Box>
        </Box>
      )}
    </>
  );
}

export default SideBar;
