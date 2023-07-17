import React from "react";
import Box from "@mui/material/Box";

const FormLogin = ({ children, ...props }) => {
  return (
    <Box
      component="section"
      sx={{
        borderRadius: "8px",
        background: "#FEFEFE",
        boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.25)",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        flexShrink: 0,
        display: "flex",
        padding: "1rem 1.5rem",
        margin: "0 auto",
        maxWidth: "400px",
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default FormLogin;
