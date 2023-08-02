import { Typography } from "@mui/material";

function Header({ children, props }) {
  // const theme = useTheme();
  return (
    <Typography variant="h1" sx={{fontSize:"clamp(1rem, 40px,60px) "}}>
      {props}
      {children}
    </Typography>
  );
}

export default Header;
