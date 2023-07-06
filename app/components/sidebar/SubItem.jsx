import { List, ListItem,ListItemButton, ListItemText, useTheme } from "@mui/material";
import { useStore } from '../../store'
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";


function SubItem({ list }) {
  const { sideBarSubItemActive , setSideBarSubItemActive, sideBarItemActive} = useStore();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    setSideBarSubItemActive(pathname.substring(1));
  }, [pathname]);
  const theme = useTheme();
  console.log("sideBarSubItemActive=", sideBarSubItemActive);
  return (
    <>
      <List sx={{ display: "block", margin: "0 4rem 0", padding: "0" }}>
        {list.map(({ text, link }) => {
          // const activeLink = pathname.substring(1);
          // const activeLink = pathname.substring(1)+`/`+`${link}`.substring(1);
          // const activeLink =`${link}`.substring(1);
          const activeLink =`campaigns${link}`;
          console.log("activeLink=", activeLink);
          console.log("text=", text);

          return (
            <ListItem key={text} sx={{ padding: "0.25rem 0 0 0" }}>
              <ListItemButton
                onClick={() => {
                  router.push(`${link}`.substring(1));
                  setSideBarSubItemActive(activeLink);
                }}
                sx={{
                  // borderBottom: 
                  //     sideBarSubItemActive === text
                  //     && "3px solid theme.palette.primary[80]",
                      
                  
                  
                  backgroundColor:
                    sideBarSubItemActive === `campaigns${link}`
                      ? theme.palette.secondary[80]
                      : "transparent",
                  // "transparent"
                  // theme.palette.background.alt,
                  // color:
                  // active === lcText
                  //   ? theme.palette.primary[600]
                  //   : theme.palette.secondary[100],
                  // theme.palette.primary[80],

                  padding: "0",
                }}
              >
                <ListItemText sx={{ margin: 0 }}>{text}</ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

export default SubItem;
