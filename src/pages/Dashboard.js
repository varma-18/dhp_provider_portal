import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SearchIcon from "@rsuite/icons/Search";
import React, { useContext, useEffect, useState } from "react";
import { CheckPicker, DatePicker, Input, InputGroup } from "rsuite";
import { CustomAreaChart } from "../components/dashboard/charts/Area";
import CustomBarChart from "../components/dashboard/charts/Bar";
import CustomLineChart from "../components/dashboard/charts/Line";
import PatientsTable from "../components/dashboard/table";
import { fakeData } from "../components/dashboard/table/mock_data";
import { ThemeContext } from "../context/ThemeProvider";

const filter_options = [
  { label: "Patient Name", value: "patientName" },
  { label: "Therapist Name", value: "therapistName" },
  { label: "Diagnosis", value: "diagnosis" },
  { label: "Status", value: "status" },
];

const CustomInputGroupWidthButton = ({ placeholder, ...props }) => (
  <InputGroup {...props} inside>
    <Input placeholder={placeholder} />
    <InputGroup.Button>
      <SearchIcon />
    </InputGroup.Button>
  </InputGroup>
);

const charts = [
  {
    label: "No. of patients with IDWG > 4%",
    Component: CustomLineChart,
  },
  {
    label: "No. of patients with IDH within last 3 months",
    Component: CustomAreaChart,
  },
  {
    label: "No. of patients with declining weight trend",
    Component: CustomBarChart,
  },
  {
    label: "No. of patients with declining BP trend ",
    Component: CustomBarChart,
  },
];

const Dashboard = () => {
  const {
    globalTheme: { dashboard },
  } = useContext(ThemeContext);

  const { midBar } = dashboard;

  const [selectedFilters, setSelectedFilters] = useState([]);

  const [patientsData, setPatientsData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (
      selectedFilters.length === 0 ||
      patientsData.length === 0 ||
      query === ""
    ) {
      setFilteredData(patientsData);
      return;
    }

    setFilteredData(
      patientsData.filter((p) => {
        let flag = false;

        selectedFilters.forEach((fil) => {
          if (p[fil].toLowerCase().includes(query.toLowerCase())) flag = true;
        });
        return flag;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, query]);

  useEffect(() => {
    let mock_data = fakeData(50);
    setPatientsData(mock_data);
    setFilteredData(mock_data);
  }, []);

  return (
    <Stack
      sx={{ p: 2, width: "100%" }}
      spacing={4}
      alignItems="center"
      bgcolor={dashboard.backgroundColor}>
      <Grid container width="100%" spacing={3}>
        {charts.map(({ label, Component }, id) => (
          <Grid
            item
            xs={12}
            md={6}
            xl={3}
            key={id}
            style={{ textAlign: "center" }}>
            <Component type={id === 2 ? "1" : "2"} />
            <div style={{ fontSize: 17, marginTop: 10, fontWeight: "600" }}>
              {label}
            </div>
          </Grid>
        ))}
      </Grid>
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        width="100%">
        <Stack direction={"row"} alignItems="center" spacing={3}>
          <Typography fontSize={midBar.fontSize} color={midBar.color}>
            Patients
          </Typography>
          <DatePicker size="lg" defaultValue={new Date()} />
        </Stack>
        <Stack direction="row" spacing={2}>
          <CheckPicker
            size="lg"
            data={filter_options}
            style={{ width: 224 }}
            placeholder="Filter by"
            onChange={(fil) => {
              setSelectedFilters(fil);
            }}
          />
          <CustomInputGroupWidthButton
            size="lg"
            placeholder="Search"
            onChange={(inp) => {
              setQuery(inp.target.value);
            }}
          />
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Chip clickable label="Clickable" color={midBar.buttonColor} />
          <Chip
            clickable
            label="Clickable"
            color={midBar.buttonColor}
            variant="outlined"
          />
          <Chip clickable label="Clickable" color={midBar.buttonColor} />
          <Chip
            clickable
            label="Clickable"
            color={midBar.buttonColor}
            variant="outlined"
          />
        </Stack>
      </Stack>
      <Box
        sx={{
          minHeight: "400px",
          width: "100%",
        }}>
        <PatientsTable patientsData={filteredData} />
      </Box>
    </Stack>
  );
};

export default Dashboard;
