import { useState, useEffect, useRef, useCallback } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Fade,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import Arrowdown from "@/app/components/svg/arrowdown.svg";

function InputSubtitleDropdownCompare({
  dataArray,
  setIsComparing,
  displayText,
  setCampaignCompare,
  campaignCompare,
  campaignName,
  setCampaignName,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [compareWith, setCompareWith] = useState(campaignCompare);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDelayedIsComparingUpdate = useCallback(
    (value, campaignCompare, campaignCompareName) => {
      setTimeout(() => {
        setIsComparing(value);
        setCampaignCompare(campaignCompare);
        setCampaignName(campaignCompareName);
      }, 1000);
    },
    [setIsComparing]
  );

  const handleClose = useCallback(
    (event) => {
      event.stopPropagation();
      console.log(
        "event.currentTarget.innerText ✅✅",
        event.currentTarget.innerText
      );
      if (
        event.currentTarget.innerText === "Compare with:" ||
        !event.currentTarget.innerText
      ) {
        handleDelayedIsComparingUpdate(false, null);
      } else {
        const campaignCompare = event.currentTarget.getAttribute("data-index");
        const campaignCompareName = event.currentTarget.innerText;
        handleDelayedIsComparingUpdate(
          true,
          campaignCompare,
          campaignCompareName
        );
      }
      setAnchorEl(null);
    },
    [handleDelayedIsComparingUpdate, isMobile]
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
        {isMobile ? "VS" : campaignName}

        {!isMobile && (
          <Arrowdown
            style={{
              fontSize: "14px",
              marginLeft: ".5rem",
            }}
          />
        )}
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
        <MenuItem onClick={handleClose}>
          {isMobile ? "VS" : "Compare with:"}
        </MenuItem>
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
