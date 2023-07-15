import Pin from "@/app/components/svg/pin.svg";
import { Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

function ChartCardTitle({
  data,
  text,
  showPin,
  pinStatus,
  onPinClick,
  pinIdSelected,
}) {
  const theme = useTheme();
  const [pinned, setPinned] = useState(pinStatus);
  console.log(pinStatus);
  useEffect(() => {
    setPinned(pinStatus);
  }, [pinStatus]);

  if (pinStatus == true) {
    console.log(data);
  }
  const onClick = () => {
    onPinClick(data);
    pinIdSelected(data._id);
    setPinned(!pinned);
  };
  return (
    <div
      style={{
        display: "grid",
        // display: pinStatus ? "grid" : "block",
        gridTemplateColumns: "2fr 0.17fr",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography variant="h4">{text}</Typography>

      <Pin
        style={{
          justifySelf: "end",

          display: showPin ? "block" : "none",
          fill: pinned  ? theme.palette.primary[80] : "transparent",

          stroke:
            pinned 
              ? theme.palette.primary[80]
              : theme.palette.background.alt,
        }}
        onClick={
          onClick
          // () => {
          // onPinClick(data);}
        }
      />
    </div>
  );
}

export default ChartCardTitle;
