import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem } from "@mui/material";
import axios from "axios"; // ✅ Make sure axios is installed

function Navbar() {
  const [actors, setActors] = useState([]);
  const hasFetched = useRef(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    console.log("Chal raha hai");
    axios
      .get("http://localhost:5000/actors")
      .then((res) => {
        console.log("Fetched Actors:", res.data);
        setActors(res.data);
        console.log(actors)
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#121212",
        boxShadow: "none",
        width: "100%"
      }}
    >
      <Toolbar>
        {/* <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton> */}

        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          HRMS Portals asjhdbasjhd                                                                 {/* Idhar kiya hai pipeline test change */}
        </Typography>

        <Box>
          <Tooltip title="User Settings">
            <IconButton onClick={handleOpen}>
              <Avatar alt="John Doe" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>


          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              sx: {
                bgcolor: "#242424",
                color: "white", 
              },
            }}
          >
            <MenuItem
              onClick={handleClose}
              sx={{
                "&:hover": {
                  backgroundColor: "#1e1e1e",
                },
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              sx={{
                "&:hover": {
                  backgroundColor: "#1e1e1e",
                },
              }}
            >
              Settings
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              sx={{
                "&:hover": {
                  backgroundColor: "#1e1e1e",
                },
              }}
            >
              Logout
            </MenuItem>

          </Menu>


        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
