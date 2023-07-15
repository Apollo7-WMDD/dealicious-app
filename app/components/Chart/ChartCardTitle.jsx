import Pin from '@/app/components/svg/pin.svg';
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
      <Typography variant="h4">{text}</Typography>

      <Pin style={{
        justifySelf: "end",
        
        display: pinStatus ? "block" : "none",
        fill: pinStatus == 'active' ? theme.palette.primary[80] : "transparent",
        
        stroke: pinStatus == 'active' ? theme.palette.primary[80] : theme.palette.background.alt,
      }} />
    </div>
  );
}

export default ChartCardTitle;
