import React from "react";
import { Button, Box, useTheme } from "@mui/material";
import DealIcon from "@/app/components/svg/dealIcon.svg";

const SingleButton = ({ text, onClick, width }) => {
  const theme = useTheme();
  return (
    <Button
      variant="contained"
      size="medium"
      startIcon={<DealIcon />}
      onClick={onClick}
      sx={{
        width: "80%",
        height: "70%",
        justifySelf: "end",
        alignSelf: "center",
        borderRadius: "12px",
        backgroundColor: theme.palette.primary[80],
        ":hover": {
          backgroundColor: theme.palette.primary[60],
        },
      }}
    >
      {text}
    </Button>

    // <Box sx={{
    //   display: 'flex',
    //   flexDirection: 'row',
    //   justifyContent: { xs: 'center', sm: 'flex-end' },
    //   margin: '20px',

    // }}>
    //   <Box
    //     component={Button}
    //     onClick={onClick}
    //     sx={{
    //       display: 'flex',
    //       height: '44px',
    //       width: width,
    //       padding: '12px 24px',
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //       gap: '8px',
    //       borderRadius: '8px',
    //       backgroundColor: '#FF5938',
    //       color: '#FEFEFE',
    //       '&:hover': {
    //         backgroundColor: '#FF5938',
    //       },
    //     }}
    //   >
    //     {text}
    //   </Box>
    // </Box>
  );
};

export default SingleButton;
