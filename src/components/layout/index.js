import { Box, CssBaseline, Stack } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const drawerWidth = 180;

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box display="flex" height="100%">
      <CssBaseline />
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Sidebar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Stack component="main" flexGrow={1}>
        <Toolbar />
        {children}
      </Stack>
    </Box>
  );
};

export default Layout;
