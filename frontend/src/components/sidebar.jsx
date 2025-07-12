import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  Toolbar,
  Box,
} from "@mui/material";

const drawerWidth = 240;

function Sidebar() {

  const navigate = useNavigate()


  const sidebarConfig = [
    { name: "Dashboard", route: "/" },
    { name: "Settings", route: "/settings" },
    { name: "Attendance", route: "/attendance" },
    { name: "Salary", route: "/salary" },
    { name: "Payslip", route: "/payslip" },
    { name: "Calendar", route: "/calendar" },
    { name: "Leaves", route: "/leaves" },
  ];

  return (

    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#121212",
          color: "#fff",
          overflow: "hidden", // ✅ prevent scrollbars
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        },
      }}
    >
      <Toolbar />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={2}
        sx={{ flexShrink: 0 }}
      >
        <Avatar
          alt="John Doe"
          src="/static/images/avatar/2.jpg"
          sx={{ width: 64, height: 64, mb: 1 }}
        />
        <Typography variant="subtitle1">John Doe</Typography>
        <Typography variant="caption">Software Engineer</Typography>
      </Box>

      <Box sx={{ overflow: "hidden", flexGrow: 1 }}>
        <List sx={{ cursor: "pointer" }}>
          {sidebarConfig.map((element,index) => (
            <ListItem
              button
              key={index}
              onClick = {() => navigate(element.route)}
              sx={{
                paddingLeft: "24px",
                paddingRight: "24px",
                "&:hover": {
                  backgroundColor: "#1e1e1e", // Optional: change text color on hover
                },
              }}
            >
              <ListItemText primary={element.name} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
