import React from "react";
import { Button, Box, useTheme } from "@mui/material";
import DealIcon from "@/app/components/svg/dealIcon.svg";

const SingleButtonNoIcon = ({ text, onClick }) => {
  const theme = useTheme();
  return (
    <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          // margin: '20px',
        }}>
        <Button
            variant="contained"
            size="medium"
            onClick={onClick}
            sx={{
                width: "100%",
                height: "70%",
                // justifySelf: "end",
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
    </Box>
  );
};

export default SingleButtonNoIcon;
