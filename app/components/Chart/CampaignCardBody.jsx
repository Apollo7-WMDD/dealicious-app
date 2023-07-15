import { Box, useTheme } from "@mui/material";
function CampaignCardBody({ children }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        textAlign: "left",
        margin: "1rem 0",
        width: "100%",
      }}
    >
      {children}
    </Box>
  );
}

export default CampaignCardBody;
