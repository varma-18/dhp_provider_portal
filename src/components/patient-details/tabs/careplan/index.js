import {
  Alert,
  Box,
  Button,
  Chip,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { VscDebugStart } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  activateCareplan,
  getPatientCareplanItems,
  getPatientCareplans,
} from "../../../../api/careplan";
import { token as access_token } from "../../../../store/authSlice";
import CreateCarePlan from "../../../modals/CreateCarePlan";

const PatientCarePlan = () => {
  const { id: patientId } = useParams();
  const [carePlans, setCarePlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [planItems, setPlanItems] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const token = useSelector(access_token);

  const fetchCarePlans = async (id, token) => {
    try {
      const data = await getPatientCareplans(id, token);
      setCarePlans(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlanItems = async (planId, token) => {
    try {
      const data = await getPatientCareplanItems(planId, token);
      setPlanItems(data.carePlanItems);
    } catch (error) {
      console.log(error);
    }
  };

  const activatePlan = async () => {
    try {
      const data = await activateCareplan(selectedPlanId, token);
      setCarePlans((prev) =>
        prev.map((plan) => {
          if (plan.isActive && plan.id !== Number(data.carePlanId))
            plan.isActive = false;
          if (plan.id === Number(data.carePlanId)) plan.isActive = true;
          return plan;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedPlanId === "") return;
    (async () => {
      await fetchPlanItems(selectedPlanId, token);
    })();
  }, [selectedPlanId, token]);

  useEffect(() => {
    (async () => {
      await fetchCarePlans(patientId, token);
    })();
  }, [patientId, token]);

  return (
    <>
      <CreateCarePlan
        open={open}
        handleClose={({ refetch }) => {
          if (refetch) {
            (async () => {
              await fetchCarePlans(patientId, token);
            })();
          }
          handleClose();
        }}
      />
      <Stack spacing={3} mx="auto" height="100%" p={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Stack
            sx={{ minWidth: "40%" }}
            direction="row"
            alignItems="center"
            spacing={3}>
            <Select
              sx={{ minWidth: { xs: "20%", lg: "40%" } }}
              disabled={carePlans.length === 0}
              value={selectedPlanId}
              onChange={(e) => {
                setSelectedPlanId(e.target.value);
              }}>
              {carePlans.map((plan) => (
                <MenuItem key={plan.id} value={plan.id}>
                  {plan.name}
                </MenuItem>
              ))}
            </Select>
            <Button
              variant="outlined"
              onClick={handleOpen}
              sx={{ textTransform: "none" }}>
              <MdAdd style={{ marginRight: 3 }} /> Create new plan
            </Button>
          </Stack>
          {selectedPlanId !== "" ? (
            !carePlans.find((plan) => plan.id === selectedPlanId)?.isActive ? (
              <Chip label="Activate" onClick={activatePlan} color="info" />
            ) : (
              <Chip label="Currently active" color="success" />
            )
          ) : null}
        </Stack>
        <Stack
          spacing={3}
          direction="column"
          flexWrap="wrap"
          justifyContent={selectedPlanId === "" ? "center" : ""}
          height="100%">
          {selectedPlanId ? (
            planItems.map((item) => {
              return (
                <Stack
                  key={item.id}
                  px={2}
                  py={1}
                  border={1}
                  borderColor="#d6d6d6"
                  bgcolor="#38a0ff"
                  borderRadius={3}
                  maxWidth="30%">
                  <Typography color="white" fontSize={17} fontWeight="bold">
                    {item.name}
                  </Typography>
                  <Typography color="white" fontSize={15}>
                    {item.description}
                  </Typography>
                </Stack>
              );
            })
          ) : (
            <Alert
              variant="outlined"
              severity="info"
              sx={{ width: "fit-content", alignSelf: "center" }}>
              Select or create a care plan to view it's items
            </Alert>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default PatientCarePlan;
