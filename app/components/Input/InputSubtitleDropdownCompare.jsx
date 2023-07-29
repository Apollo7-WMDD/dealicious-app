import { useState, useEffect, useRef, useCallback } from "react";
import { Button, Menu, MenuItem, Fade, useTheme } from "@mui/material";

import Arrowdown from "@/app/components/svg/arrowdown.svg";

function InputSubtitleDropdownCompare({
  dataArray,
  setIsComparing,
  displayText,
  setCampaignCompare,
}) {
  const theme = useTheme();
  const [compareWith, setCompareWith] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // CAMPAIGN SELECTOR
  const handleDelayedIsComparingUpdate = useCallback(
    (value, campaignCompare) => {
      setTimeout(() => {
        setIsComparing(value);
        setCampaignCompare(campaignCompare);
      }, 1000);
    },
    [setIsComparing]
  );

  const handleClose = useCallback(
    (event) => {
      event.stopPropagation();
      setCompareWith(event.currentTarget.innerText || "Compare with:");
      if (
        event.currentTarget.innerText === "Compare with:" ||
        !event.currentTarget.innerText
      ) {
        handleDelayedIsComparingUpdate(false, null);
      } else {
        const campaignCompare = event.currentTarget.getAttribute("data-index");
        handleDelayedIsComparingUpdate(true, campaignCompare);
      }
      setAnchorEl(null);
    },
    [handleDelayedIsComparingUpdate]
  );

  return (
    <>
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
        }}
      >
        {compareWith == null ? "Compare with: " : `${compareWith}`}

        <Arrowdown
          style={{
            fontSize: "14px",
            marginLeft: ".5rem",
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
        <MenuItem onClick={handleClose}>Compare with:</MenuItem>
        {dataArray.map(
          (item) =>
            displayText !== item.name && (
              <MenuItem
                key={item._id}
                onClick={handleClose}
                data-index={item._id}
              >
                {item.name}
              </MenuItem>
            )
        )}
      </Menu>
    </>
  );
}

export default InputSubtitleDropdownCompare;
