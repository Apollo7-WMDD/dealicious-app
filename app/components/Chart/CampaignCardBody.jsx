import { Box, useTheme } from "@mui/material";
function CampaignCardBody({ children }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        textAlign: "left",
        margin: "1rem 0",
        width: "100%",
        
        [theme.breakpoints.down("md")]: {
          flexBasis: "45%",
          flexGrow: "1",
          flexShrink: "0",
          justifyContent: "start",
        },
      }}
    >
      {children}
    </Box>
  );
}

export default CampaignCardBody;
