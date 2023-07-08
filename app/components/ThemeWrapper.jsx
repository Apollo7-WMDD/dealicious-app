"use client";

import { useMemo } from "react";

import { themeSettings } from "../theme.js";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import SideBar from "./sidebar/SideBar.jsx";
import { createTheme } from "@mui/material/styles";
import { useStore } from "../store.js";
import { Box } from "@mui/system";
import Footer from "./Footer.jsx";

function ThemeWrapper({ children }) {
  const { mode, isSidebarOpen } = useStore();
  const theme = useMemo(() => createTheme(themeSettings(mode), [mode]));

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SideBar />
        <Box
          sx={{
            margin: "2rem 0",
            width: "calc(100% - 250px)",
            // minHeight: "100%",
          }}
        >
          <Box sx={{ padding: "0 2%" ,minHeight: "100vh",}}>{children}</Box>

          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default ThemeWrapper;
