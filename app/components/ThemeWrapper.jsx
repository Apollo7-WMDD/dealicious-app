"use client";

import { useMemo } from "react";

import { themeSettings } from "../theme.js";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import SideBar from "./SideBar.jsx";
import { createTheme } from "@mui/material/styles";
import { useStore } from "../store.js";

function ThemeWrapper(
  {children}
  ) {
    
    const { mode, isSidebarOpen } = useStore();
  const theme = useMemo(() => createTheme(themeSettings(mode), [mode]));
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {children}
        
      </ThemeProvider>
      
    </>
  );
}

export default ThemeWrapper;
