import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";
import { GiHealthNormal, GiShinyApple } from "react-icons/gi";
import { MdMessage } from "react-icons/md";
import PatientCarePlan from "./careplan";
import PatientMessages from "./messages";

const PatientTabs = ({ patient }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Stack
      bgcolor="white"
      borderRadius={5}
      sx={{ boxShadow: 2 }}
      p={2}
      flex={1}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <Tab
            icon={<GiHealthNormal />}
            iconPosition="start"
            label={"care plan"}
            sx={{
              fontSize: { xs: 14, md: 16 },
              fontWeight: "600",
              minHeight: 0,
            }}
          />
          <Tab
            icon={<GiShinyApple />}
            iconPosition="start"
            label={"nutrition plan"}
            sx={{
              fontSize: { xs: 14, md: 16 },
              fontWeight: "600",
              minHeight: 0,
            }}
          />
          <Tab
            icon={<MdMessage />}
            iconPosition="start"
            label={"messages"}
            sx={{
              fontSize: { xs: 14, md: 16 },
              fontWeight: "600",
              minHeight: 0,
            }}
          />
        </Tabs>
      </Box>
      <Box flex={1}>
        {value === 0 && <PatientCarePlan />}
        {value === 1 && <div>nutrition plan</div>}
        {value === 2 && <PatientMessages patient={patient} />}
      </Box>
    </Stack>
  );
};

export default PatientTabs;
