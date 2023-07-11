import { Box, Drawer, Typography, Divider, IconButton } from "@mui/material";
import { useStore } from "../../../lib/context/store.js";
import { useTheme } from "@mui/material";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

function SideBarUtilButton() {
  const { isSidebarOpen, mode, setMode } = useStore();
  const theme = useTheme();
  return (
    <div>
      {/* CHANGE THEME BUTTON */}
      <IconButton
        sx={{
          padding: ".5rem 3rem ",
          typography: "h6",
          fontSize: "12px",
          borderRadius: "0",
          color: theme.palette.neutral[40],
          justifyContent: "flex-start",
        }}
        onClick={() => setMode()}
      >
        {theme.palette.mode === "dark" ? (
          <DarkModeOutlined sx={{ fontSize: "1rem", marginRight: ".5rem" }} />
        ) : (
          <LightModeOutlined sx={{ fontSize: "1rem", marginRight: ".5rem" }} />
        )}{" "}
        Change theme
      </IconButton>
      {/* LOGOUT BUTTON */}
      <IconButton
        sx={{
          padding: ".25rem 3rem ",
          typography: "h6",
          fontSize: "12px",
          borderRadius: "0",
          color: theme.palette.neutral[40],
          justifyContent: "flex-start",
        }}
        // CREATE FUNCTION TO LOGOUT
        onClick={() => console.log("LOG OUT")}
      >
        <LogoutIcon sx={{ fontSize: "1rem", marginRight: ".5rem" }} />
        Log out
      </IconButton>
    </div>
  );
}

export default SideBarUtilButton;
