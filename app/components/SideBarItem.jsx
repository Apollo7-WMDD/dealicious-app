// import {
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";
// import { useTheme } from "@mui/material";
// import {
//   HomeOutlined,
//   ShoppingCartOutlined,
//   Groups2Outlined,
//   GraphicEqOutlined,
// } from "@mui/icons-material";
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import Groups2Outlined from '@mui/icons-material/Groups2Outlined';
import GraphicEqOutlined from '@mui/icons-material/GraphicEqOutlined';
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

// function SideBarItem() {
//   const theme = useTheme();
//   // const { mode } = useStore();
//   // const theme = useMemo(() => createTheme(themeSettings(mode), [mode]));
//   const router = useRouter();

  return (
    <>
      <List
        sx={{
          padding: "0",
        }}
      >
        <Box>ddddddddd</Box>
        {navItems.map(({text, icon}) => {
          const lcText = text.toLowerCase();
          return (
            <ListItem disablePadding key={text}>
              <ListItemButton
                onClick={() => {
                  router.push(`/campaigns`);
                  // setActive(lcText);
                }}
                sx={{
                  backgroundColor:
                    // active === lcText
                    //   ? theme.palette.secondary[300]
                    //   : "transparent",
                    theme.palette.background.alt,
                  // color:
                  // active === lcText
                  //   ? theme.palette.primary[600]
                  //   : theme.palette.secondary[100],
                  // theme.palette.primary[80],

                  fontFamily: "Ubuntu",
                }}
              >
                <ListItemIcon
                  sx={{
                    ml: "2rem",
                    // color:
                    // active === lcText
                    //   ? theme.palette.primary[600]
                    //   : theme.palette.secondary[200],
                    // theme.palette.primary[80],
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
                >
                  {/* {active === lcText && (
                  <ChevronRightOutlined sx={{ ml: "auto" }} />
                  )} */}
                </ListItemText> 
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

// export default SideBarItem;
