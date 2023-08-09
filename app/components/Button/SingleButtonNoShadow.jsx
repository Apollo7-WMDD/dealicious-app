import React from "react";
import { Button, useTheme } from "@mui/material";

const SingleButtonNoShadow = ({ text, onClick, width, variant = "contained" }) => {
  const theme = useTheme();
  return (
    <Button
    variant={variant}
    size="medium"
    onClick={onClick}
    sx={{
        width: width,
        alignSelf: "center",
        borderRadius: "12px",
        borderColor: theme.palette.primary[80],
        boxShadow: 'none',
        ":hover": {
        borderColor: theme.palette.primary[60],
        color: theme.palette.primary[60],
        boxShadow: 'none', 
        },
        ":active": {
        boxShadow: 'none', 
        },
        ":focus-visible": {
        boxShadow: 'none', 
        },
        '&.MuiButton-contained': {
        color: 'white',
        backgroundColor: theme.palette.primary[80],
        ':hover': {
            backgroundColor: theme.palette.primary[60],
        }
        },
        '&.MuiButton-outlined': {
        color: theme.palette.primary[80],
        backgroundColor: 'transparent',
        ':hover': {
            backgroundColor: theme.palette.primary[10],
        }
        },
    }}
    >
    {text}
    </Button>
  );
};

export default SingleButtonNoShadow;
