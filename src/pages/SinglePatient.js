import { LinearProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPatientByUserId } from "../api/patients";
import PatientInfo from "../components/patient-details/PatientInfo";
import PatientTabs from "../components/patient-details/tabs";
import { token } from "../store/authSlice";
import { findPatientByUserId } from "../store/patientsSlice";

const Temp = () => {
  const { id } = useParams();
  const [patientData, setPatientData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const accessToken = useSelector(token);
  const patientFromState = useSelector((state) =>
    findPatientByUserId(state, Number(id))
  );

  useEffect(() => {
    if (patientFromState) {
      setPatientData(patientFromState);
      return;
    }
    if (!patientFromState && accessToken) {
      (async () => {
        setLoading(true);
        try {
          const data = await getPatientByUserId({ id, accessToken });
          setPatientData(data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [accessToken, id, patientFromState]);

  if (loading) {
    return (
      <Stack>
        <LinearProgress color="secondary" />
      </Stack>
    );
  }

  if (patientData) {
    return (
      <Stack
        px={{ xs: 2, lg: 5 }}
        py={2}
        spacing={4}
        bgcolor="#f5f5f5"
        height="100%">
        <PatientInfo patient={patientData} />
        <PatientTabs patient={patientData} />
      </Stack>
    );
  }

  if (patientFromState === undefined && patientData === null) {
    return (
      <Stack
        height="93%"
        alignItems="center"
        justifyContent="center"
        bgcolor="#f5f5f5"
        spacing={1}>
        <img src="/404-error.png" alt="not-found" style={{ width: "30%" }} />
        <Typography sx={{ color: "#b188ff", fontSize: "2.5rem" }}>
          Patient not found!
        </Typography>
      </Stack>
    );
  }
};

export default Temp;
