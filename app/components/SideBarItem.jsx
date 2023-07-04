import {
  List,
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material";
// import {
//   HomeOutlined,
//   ShoppingCartOutlined,
//   Groups2Outlined,
//   GraphicEqOutlined,
// } from "@mui/icons-material";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import Groups2Outlined from "@mui/icons-material/Groups2Outlined";
import GraphicEqOutlined from "@mui/icons-material/GraphicEqOutlined";
import { useRouter } from "next/navigation";

const navItems = [
  {
    text: "Campaigns",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
    icon: <GraphicEqOutlined />,
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
];

function SideBarItem() {
  const theme = useTheme();
  // const { mode } = useStore();
  // const theme = useMemo(() => createTheme(themeSettings(mode), [mode]));
  const router = useRouter();

  return (
    <>
      <List
        sx={{
          padding: "0",
        }}
      >
        <Box>ddddddddd</Box>
        {navItems.map(({ text, icon }) => {
          const lcText = text.toLowerCase();
          return (
            <ListItem disablePadding key={text}>
              <ListItemButton
                onClick={() => {
                  router.push(`/campaigns`);
                  // setActive(lcText);
                }}
                sx={{
                  backgroundColor: theme.palette.background.alt,
                  fontFamily: "Ubuntu",
                }}
              >
                <ListItemIcon
                  sx={{
                    ml: "2rem",
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={text}
                  sx={{
                    typography: "h4",
                  }}
                ></ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

export default SideBarItem;
