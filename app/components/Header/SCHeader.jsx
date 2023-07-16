"use client";

import { Box, useTheme } from "@mui/material";
import DealIcon from "@/app/components/svg/scdealicon.svg";

function SCHeader() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        borderBottom: "3px solid",
        borderColor: theme.palette.primary[80],
        height: "78px",
        display: "flex",
        flex: "flex-flow",
      }}
    >
      <DealIcon />
    </Box>
  );
}

export default SCHeader;
