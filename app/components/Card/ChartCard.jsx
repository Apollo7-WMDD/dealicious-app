import { Box } from "@mui/material";
import { useTheme } from "@mui/material";

function ChartCard({ children, gridColumn }) {
  const theme = useTheme();
  const shadowColor = `${theme.palette.neutral[20]}1f`;

  return (
    <Box
      sx={{
        gridColumn: gridColumn,
        boxShadow: `0px 4px 20px 0px ${shadowColor}`,
        borderRadius: "8px",
        display: "flex",
        padding: "1rem 1.5rem",
        flexDirection: "column",
        justifyContent: "space-between",
        // justifyContent: "start",
        alignItems: "center",
        flexShrink: 0,
        gap: "1rem",
        minHeight: "310px",
        [theme.breakpoints.down("md")]: {
          gridColumn: "1/-1",
        },
      }}
    >
      {children}
    </Box>
  );
}

export default ChartCard;
