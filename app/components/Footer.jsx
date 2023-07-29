"use client";
import { Box, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();
  return (
    // create simple footer with tailwind no links
    <Box
      sx={{
        // position: "absolute",
        // bottom: "0",
        background: theme.palette.secondary[100],
        // width: "inherit",
        fontSize: "1rem",
        padding: "1rem 2%",
        overflowX: "hidden",
      }}
    >
      Dealicious &copy; 2023{" "}
    </Box>
  );
};

export default Footer;
