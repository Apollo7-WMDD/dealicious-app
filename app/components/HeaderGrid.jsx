import { Box, useTheme } from "@mui/material";



function HeaderGrid({ children }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        width: "100%",
        gap: "1.5rem",
        gridAutoFlow: "row dense",
        margin: "0 0 1.5rem 0",
        [theme.breakpoints.down('lg')]: {
          gridTemplateColumns: "repeat(2, 1fr)"},
        [theme.breakpoints.down('md')]: {
          gridTemplateColumns: "repeat(1, 1fr)",
          
        }
      }}
    >
      {children}
    </Box>
  );
}

export default HeaderGrid;
