import {
  List,
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import SubItem from "./SubItem.jsx";
import DealIcon from "../svg/dealIcon.svg";
import InsightIcon from "../svg/insighticon.svg";
import BurnCodeIcon from "../svg/burnCode.svg";
import ProfileIcon from "../svg/profileIcon.svg";
import { useStore } from "../../store.js";
import { useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const navItems = [
  {
    text: "Campaigns",
    icon: <DealIcon />,
    link: "/campaigns/active",
  },
  {
    text: "Insights",
    icon: <InsightIcon />,
    link: "/insights",
  },
  {
    text: "Burn a Code",
    icon: <BurnCodeIcon />,
    link: "/burnCode",
  },
  {
    text: "Profile",
    icon: <ProfileIcon />,
    link: "/profile",
  },
];

const campaignSubItems = [
  {
    text: "Ongoing",
    link: "/active",
  },
  {
    text: "Upcoming",
    link: "/upcoming",
  },
];

const insightSubItems = [
  {
    text: "Overview",
    link: "/overview",
  },
  {
    text: "Campaigns",
    link: "/campaigns",
  },
  {
    text: "Customers",
    link: "/customers",
  },
];

function SideBarItem() {
  const theme = useTheme();
  const { sideBarItemActive, setSideBarItemActive } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    setSideBarItemActive(pathname.substring(1));
  }, [pathname]);
  console.log("sideBarItemActive=", sideBarItemActive);
  return (
    <>
      <List
        sx={{
          padding: "0",
        }}
      >
        {navItems.map(({ text, icon, link }) => {
          const activeLink = `${link}`.substring(1);

          return (
            <ListItem key={text} style={{ display: "block" }}>
              <ListItemButton
                onClick={() => {
                  router.push(`${link}`);
                  setSideBarItemActive(activeLink);
                  console.log("activeLink=", activeLink);
                }}
                sx={{
                  backgroundColor:
                    sideBarItemActive === activeLink
                      ? theme.palette.primary[120]
                      : "transparent",
                  // "transparent"
                  // theme.palette.background.alt,
                  // color:
                  // active === lcText
                  //   ? theme.palette.primary[600]
                  //   : theme.palette.secondary[100],
                  // theme.palette.primary[80],

                  padding: "0 2rem",
                }}
              >
                <ListItemIcon
                  sx={{
                    marginRight: ".5rem",
                    color:
                      // active === lcText
                      //   ? theme.palette.primary[600]
                      //   : theme.palette.secondary[200],
                      theme.palette.background.alt,
                    // theme.palette.primary[80],
                    minWidth: "auto",
                    // width: "auto",
                    fontSize: "1.5rem",
                    // overflow: "clip"
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
              {(sideBarItemActive === activeLink &&
                (activeLink == `campaigns/active`) && (
                  <SubItem list={campaignSubItems}></SubItem>
                ))}
              {(sideBarItemActive === activeLink &&
                (activeLink == `campaigns/upcoming`) && (
                  <SubItem list={campaignSubItems}></SubItem>
                ))}
              {sideBarItemActive === activeLink &&
                activeLink === "insights" && (
                  <SubItem list={insightSubItems}></SubItem>
                )}
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

export default SideBarItem;
