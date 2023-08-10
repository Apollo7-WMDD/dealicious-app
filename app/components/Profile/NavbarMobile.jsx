import { useState } from "react";
import { Box, Tab, Tabs, useTheme } from "@mui/material";

const NavbarMobile = ({ value, setValue }) => {
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        overflow: "scroll",
        flexGrow: 1,
        // bgcolor: "gold",
        bgcolor: theme.palette.background,
        display: { xs: "block", sm: "none" },
        marginBottom: "16px",
        marginLeft: "16px",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        // overflow="scroll"
        allowScrollButtonsMobile={true}
        // centered
        sx={{
          // overflow: "scroll",
          // backgroundColor: "navy",
          "& .MuiTabs-indicator": {
            // backgroundColor: "hotpink",
            backgroundColor: theme.palette.primary[80],
            // overflow: "auto",
          },
          '& .MuiTabs-scroller': {
            overflow: "auto !important",
        },
        }}
      >
        <Tab
          label="Information"
          sx={{
            fontFamily: "Mukta",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "32px",
          }}
        />
        <Tab
          label="Hours & Images"
          sx={{
            fontFamily: "Mukta",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "32px",
          }}
        />
        <Tab
          label="Referral System"
          sx={{
            fontFamily: "Mukta",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "32px",
          }}
        />
      </Tabs>
    </Box>
  );
};

export default NavbarMobile;
