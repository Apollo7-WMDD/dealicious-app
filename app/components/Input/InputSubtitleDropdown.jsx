import { useState, useEffect } from "react";
import { Button, Menu, MenuItem, Fade, useTheme } from "@mui/material";

import Arrowdown from "@/app/components/svg/arrowdown.svg";

import { useRouter } from "next/navigation";

import { useStore } from "@/lib/context/user_context/store";

// fetch imports
import { fetchAllCampaigns } from "@/lib/fetching/campaigns/data";

function InputSubtitleDropdown({text}) {
    console.log(text);
  const router = useRouter();
  const { restaurantOwnerId, restaurantId } = useStore();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [displayText, setDisplayText] = useState();
  const [dataArray, setDataArray] = useState([]);
  const open = Boolean(anchorEl);
  
  useEffect(() => {
   setDisplayText(text);
  }, [text]);
  console.log(displayText)

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAllCampaigns(restaurantOwnerId);

      setDataArray(result.campaigns || []);
    };
    fetchData();
  }, []);

  console.log(dataArray);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    console.log(event.currentTarget.getAttribute("data-index"));
    const link = event.currentTarget.getAttribute("data-index");
    
    router.push(link);
    setDisplayText(event.currentTarget.innerText);

    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          padding: 0,
          typography: "h3",
          color: theme.palette.background.alt,
          //   width: "100%",
        }}
      >
        {displayText == null ? "Campaing Data Overview(All)" : `${displayText}`}

        <Arrowdown
          style={{
            fontSize: "14px",
            marginLeft: ".5rem",
            // width:"10%", height:"10%"
          }}
        />
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        sx={{ width: "100%" }}
      >
        <MenuItem data-index={`/dashboard/insights/overview/${restaurantOwnerId}/${restaurantId}`} onClick={handleClose}>Campaing Data Overview(All)</MenuItem>
        {dataArray.map((item) => (
          <MenuItem key={item._id} data-index={`/dashboard/insights/campaigns/${restaurantOwnerId}/${restaurantId}/${item._id}`} onClick={handleClose}>
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default InputSubtitleDropdown;
