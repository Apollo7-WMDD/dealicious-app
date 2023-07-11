import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useStore } from "../../../lib/context/store";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function SubItem({ list }) {
  const { sideBarSubItemActive, setSideBarSubItemActive, sideBarItemActive } =
    useStore();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    setSideBarSubItemActive(pathname.substring(1));
  }, [pathname]);
  const theme = useTheme();
  // console.log("sideBarSubItemActive=", sideBarSubItemActive);
  return (
    <>
      <List sx={{ display: "block", margin: "0 4rem 0", padding: "0" }}>
        {list.map(({ text, link }) => {
          const activeLink = `${link}`.substring("1");
          const activeLinkSplit = activeLink.split("/");
          const currentURL = pathname.split("/");

          return (
            <ListItem key={text} sx={{ padding: "0.25rem 0 0 0" }}>
              <ListItemButton
                onClick={() => {
                  router.push(`${link}`.substring(1));
                  setSideBarSubItemActive(activeLink);
                }}
                sx={{
                  borderBottom:
                    // currentURL[3] == text.toLowerCase()
                    currentURL[3] == activeLinkSplit[2]
                      ? `.15rem solid ${theme.palette.primary[80]}`
                      : "none",

                  padding: "0",
                }}
              >
                <ListItemText
                  disableTypography
                  primary={text}
                  sx={{
                    margin: 0,
                    typography: "h6",
                    color: theme.palette.neutral[40],
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

export default SubItem;
