import React from "react";
import { useTheme, Box } from "@mui/material";

const FormLogin = ({ children, ...props }) => {
  const theme = useTheme();
  const shadowColor = `${theme.palette.neutral[20]}1f`;

  return (
    <Box
      component="section"
      sx={{
        borderRadius: "12px",
        background: "#FEFEFE",
        boxShadow: `0px 4px 20px 0px ${shadowColor}`,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        flexShrink: 0,
        display: "flex",
        padding: "1.5rem",
        flexGrow: 1,
        maxWidth: "450px",
        width: "100%",
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default FormLogin;
