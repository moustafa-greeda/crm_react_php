import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";

// const drawerWidth = 240;

export default function Sidebar() {
  return (

    <Box sx={{ display: "flex", marginTop: "100px" }}>
      <Drawer
        variant="permanent"
        sx={{
          zIndex: -8,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: "100%",
            boxSizing: "border-box"
          }
        }}
      >
        <Box
          sx={{
            overflow: "auto",
            // backgroundColor: "red",
            // width: "100%",
            marginTop: "70px"
          }}
        >
          <List>
            {["Home", "Settings", "Notifications", "Profile"].map(
              (text, index) => (
                <ListItem key={text}>
                  <ListItemButton>
                    <ListItemIcon>
                      {index === 0 ? (
                        <HomeIcon />
                      ) : index === 1 ? (
                        <SettingsIcon />
                      ) : index === 2 ? (
                        <NotificationsIcon />
                      ) : (
                        <PersonIcon />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>
    </Box>
    
  );
}
