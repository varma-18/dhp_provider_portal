import {
  Box,
  Divider,
  Drawer,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { cloneElement, useContext } from "react";
import { FaRegCalendarAlt, FaSearch } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { RiLineChartFill } from "react-icons/ri";
import { SiGooglemessages } from "react-icons/si";
import { TiHome } from "react-icons/ti";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeProvider";

const list_data = [
  { icon: <TiHome fontSize={20} />, name: "Home", path: "/dashboard" },
  {
    icon: <FaRegCalendarAlt fontSize={20} />,
    name: "Calendar",
    path: "/calendar",
  },
  {
    icon: <RiLineChartFill fontSize={20} />,
    name: "Analytics",
    path: "/analytics",
  },
  {
    icon: <SiGooglemessages fontSize={20} />,
    name: "Messages",
    path: "/messages",
  },
  { icon: <FaSearch fontSize={20} />, name: "Search", path: "/search" },
  { icon: <FiSettings fontSize={20} />, name: "Settings", path: "/settings" },
];

const MenuItem = ({ text, icon, path, linkColor, hoverColor }) => {
  return (
    <Link to={path} style={{ textDecoration: "none" }}>
      <Box
        borderRadius={2}
        width="90%"
        margin="auto"
        sx={{
          cursor: "pointer",
          ":hover": { backgroundColor: hoverColor },
        }}>
        <Stack
          direction="row"
          margin="auto"
          p={2}
          spacing={3}
          alignItems="center">
          {cloneElement(icon, { color: linkColor })}
          <Typography fontSize={16} color={linkColor}>
            {text}
          </Typography>
        </Stack>
      </Box>
    </Link>
  );
};

const DrawerContent = () => {
  const { pathname } = useLocation();

  const {
    globalTheme: { sidebar },
  } = useContext(ThemeContext);

  return (
    <Box height="100%" bgcolor={sidebar.backgroundColor}>
      <Toolbar />
      <Divider />
      <Stack spacing={2} py={1}>
        {list_data.map((data, i) => (
          <MenuItem
            key={i}
            hoverColor={sidebar.hoverColor}
            icon={data.icon}
            linkColor={
              pathname === data.path
                ? sidebar.activeLinkColor
                : sidebar.linkColor
            }
            path={data.path}
            text={data.name}
          />
        ))}
      </Stack>
    </Box>
  );
};

const Sidebar = ({ drawerWidth, mobileOpen, handleDrawerToggle, window }) => {
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        width: { md: drawerWidth },
        flexShrink: { md: 0 },
      }}>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          border: "1px solid red",
        }}>
        <DrawerContent />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open>
        <DrawerContent />
      </Drawer>
    </Box>
  );
};

export default Sidebar;
