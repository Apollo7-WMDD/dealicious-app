import { Box, useTheme } from "@mui/material";



function MainGrid({ children }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        width: "100%",
        gap: "1.5rem",
        gridAutoFlow: "row dense",
        margin: "1.5rem 0",
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

export default MainGrid;
