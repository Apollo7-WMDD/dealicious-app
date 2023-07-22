import { Typography } from "@mui/material";

function Header({ children, props }) {
  // const theme = useTheme();
  return (
    <Typography variant="h1">
      {props}
      {children}
    </Typography>
  );
}

export default Header;
