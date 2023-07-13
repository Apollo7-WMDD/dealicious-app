import PushPinIcon from "@mui/icons-material/PushPin";
import { Typography,useTheme } from "@mui/material";



function ChartCardTitle({ text, pinStatus }) {
    const theme = useTheme();
  return (
    <div
      style={{
        display: pinStatus ? "grid": "block",
        gridTemplateColumns: "2fr 0.17fr",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography variant="h3">{text}</Typography>

      <PushPinIcon sx={{
        justifySelf: "end",
        rotate: "45deg",
        display: pinStatus ? "block" : "none",
        fill: pinStatus == 'active' ? theme.palette.primary[80] : "transparent",
        stroke: pinStatus == 'active' ? "none" : theme.palette.background.alt,
      }} />
    </div>
  );
}

export default ChartCardTitle;
