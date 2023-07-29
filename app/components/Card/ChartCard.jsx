import { Box } from "@mui/material";
import { useTheme } from "@mui/material";

function ChartCard({ content, children, gridColumn }) {
  const theme = useTheme();
  const shadowColor = `${theme.palette.neutral[20]}1f`;

  return (
    <Box
      sx={{
        gridColumn: { gridColumn },
        boxShadow: `0px 4px 20px 0px ${shadowColor}`,
        borderRadius: "8px",

        display: "flex",
        padding: "1rem 1.5rem",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        flexShrink: 0,

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
