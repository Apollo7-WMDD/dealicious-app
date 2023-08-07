import { Box } from "@mui/material";
import { useTheme } from "@mui/material";

function ChartCard_Insight({ content, children, gridColumn }) {
  const theme = useTheme();
  const shadowColor = `${theme.palette.neutral[20]}1f`;

  return (
    <Box
      // onClick={content}
      sx={{
        gridColumn: { gridColumn },
        boxShadow: `0px 4px 20px 0px ${shadowColor}`,
        borderRadius: "8px",
        height: "100%",
        minHeight: "310px",
        display: "flex",
        flexDirection: "column",
        // width: "380px",
        // height: "310px";
        padding: "1rem 1.5rem",
        
        
        
        justifyContent: "space-between",
        alignItems: "center",
        // flexShrink: 0,
        [theme.breakpoints.down("md")]: {
          gridColumn: "1/-1",
          flexDirection: "row",
          flexFlow: "row wrap",
        },
        ":hover": {
          color: theme.palette.primary[80],
        },
       
      }}
    >
      {children}
    </Box>
  );
}

export default ChartCard_Insight;
