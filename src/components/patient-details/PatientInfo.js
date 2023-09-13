import { Avatar, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { FaWeight } from "react-icons/fa";
import { VscPerson } from "react-icons/vsc";

const info_list = [
  { key: "email", label: "Email" },
  { key: "phoneNumber", label: "Phone" },
  { key: "sex", label: "Gender" },
  { key: "status", label: "CKD status" },
  { key: "primaryCare", label: "Primary Care" },
  { key: "dryWeight", label: "Last dry weight" },
];

const InfoBox = ({ label, value }) => (
  <Box padding={2} minWidth="30%">
    <Typography variant="body2" fontSize={13}>
      {label}
    </Typography>
    <Typography variant="subtitle1" color="black">
      {value}
    </Typography>
  </Box>
);

const PatientInfo = ({ patient }) => {
  return (
    <Stack
      direction={{ sm: "column", lg: "row" }}
      spacing={5}
      bgcolor="white"
      borderRadius={5}
      sx={{ boxShadow: 2 }}
    >
      <Stack
        padding={2}
        width={{ lg: "40%", sm: "100%" }}
        bgcolor="#38a0ff"
        borderRadius={5}
        color="white"
      >
        <Stack direction="row" spacing={5} padding={2}>
          <Avatar sx={{ width: 100, height: 100 }} variant="rounded">
            {`${patient?.firstName[0]}${patient?.lastName}`}
          </Avatar>
          <Stack justifyContent="center">
            <Typography variant="h6">{`${patient?.firstName} ${patient?.lastName}`}</Typography>
            <Typography variant="subtitle1">{`Age: ${patient?.age}`}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-around" padding={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <VscPerson size={25} />
            <Stack>
              <Typography variant="body2" fontSize={13}>
                Height
              </Typography>
              <Typography variant="subtitle1">
                {`${patient?.height} ${patient?.heightUom}`}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <FaWeight size={20} />
            <Stack>
              <Typography variant="body2" fontSize={13}>
                Weight
              </Typography>
              <Typography variant="subtitle1">
                {`${patient?.weight} ${patient?.weightUom}`}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Stack minWidth="60%" justifyContent="space-evenly">
        <Stack direction="row" justifyContent={"space-evenly"}>
          {info_list.slice(0, 3).map((info, idx) => (
            <InfoBox key={idx} label={info.label} value={patient[info.key]} />
          ))}
        </Stack>
        <Stack direction="row" justifyContent={"space-evenly"}>
          {info_list.slice(3).map((info, idx) => (
            <InfoBox key={idx} label={info.label} value={patient[info.key]} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PatientInfo;
