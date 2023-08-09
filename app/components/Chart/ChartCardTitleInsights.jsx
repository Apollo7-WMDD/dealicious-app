import Pin from "@/app/components/svg/pin.svg";
import { Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

function ChartCardTitleInsights({
  data,
  text,
  showPin,
  pinStatus,
  setClickPin,
}) {
  const theme = useTheme();
  const [pinned, setPinned] = useState(data._id);

  useEffect(() => {
    setPinned(pinStatus);
  }, [pinStatus]);

  const onClick = async (e) => {
    e.stopPropagation();
    setPinned(!pinned);

    try {
      const res = await fetch(
        `/api/dashboard/insights/toggle_pin/${data._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      if (!res.ok) throw new Error(res.status);

      const dataRes = await res.json();
      data.pinned = !data.pinned;
      setClickPin((prev) => !prev);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 0.17fr",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        [theme.breakpoints.down("md")]: {
          flexShrink: 0,
          flexBasis: "100%",
          flexGrow: 1,  
        },
        
      }}
    >
      <Typography variant="h3" sx={{fontSize:"24px"}}>{text}</Typography>

      <Pin
        className="pin-icon"
        style={{
          justifySelf: "end",
          display: showPin ? "block" : "none",
          fill: pinned ? theme.palette.primary[80] : "transparent",
          transition: "all 0.2s ease-in-out",
          stroke: pinned
            ? theme.palette.primary[80]
            : theme.palette.background.alt,
        }}
        onClick={onClick}
      />
    </div>
  );
}

export default ChartCardTitleInsights;
