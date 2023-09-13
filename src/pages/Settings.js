import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import DashboardTheming from "../components/theming/DashboardTheming";
import HeaderTheming from "../components/theming/HeaderTheming";
import SideBarTheming from "../components/theming/SideBarTheming";

const Settings = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      gap={{ xs: 3, md: 5 }}
      paddingY={{ xs: 2, md: 5 }}>
      <Typography
        alignSelf="center"
        fontSize={{ xs: 23, md: 25, lg: 27 }}
        fontWeight="500">
        Configure the Application theme
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs centered value={value} onChange={handleChange}>
          <Tab
            label="Header"
            sx={{ fontSize: { xs: 14, md: 16 }, fontWeight: "600" }}
          />
          <Tab
            label="Sidebar"
            sx={{ fontSize: { xs: 14, md: 16 }, fontWeight: "600" }}
          />
          <Tab
            label="Dashboard"
            sx={{ fontSize: { xs: 14, md: 16 }, fontWeight: "600" }}
          />
        </Tabs>
      </Box>
      <Box minHeight="600px">
        {value === 0 && <HeaderTheming />}
        {value === 1 && <SideBarTheming />}
        {value === 2 && <DashboardTheming />}
      </Box>
    </Box>
  );
};

export default Settings;
