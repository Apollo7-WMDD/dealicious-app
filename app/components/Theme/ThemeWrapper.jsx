"use client";

// react states
import { useState, useMemo } from "react";

// import material ui theme
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import themeSettings from "@/lib/theme/theme";

// import theme state
import { useStore } from "@/lib/context/sidebar_context/store";

const ThemeWrapper = ({ children }) => {
  const { mode } = useStore();

  const theme = useMemo(() => createTheme(themeSettings(mode), [mode]));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
