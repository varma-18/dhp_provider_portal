import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser, selectCurrentUser } from "../../store/authSlice";

const ProviderRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);

  const [inputs, setInputs] = useState({
    email: currentUser?.email ?? "",
    firstName: currentUser?.firstName ?? "",
    middleName: currentUser?.middleName ?? "",
    lastName: currentUser?.lastName ?? "",
    phoneNumber: "",
  });

  const handleInputChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const [validationError, setValidationError] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const vertical = "top";
  const horizontal = "center";

  const validate = async () => {
    return !inputs.email || !inputs.firstName || !inputs.lastName;
  };

  const handleVallidationClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setValidationError(false);
  };

  const handleSaveSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSaveSuccess(false);
  };

  const handleSubmit = async () => {
    const validationError = await validate();
    setValidationError(validationError);
    const user_data = {
      ...inputs,
      iamProvider: currentUser.provider,
      iamId: currentUser.iamId,
    };
    if (!validationError) {
      try {
        // the unwrap() function exposes the promise so that we can use try catch
        await dispatch(createUser(user_data)).unwrap();
        setSaveSuccess(true);
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
      }
    } else {
      // Highlight inputs with errors
    }
  };

  return (
    <Box mt={2} ml={2} mr={2} mb={2}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={validationError}
        autoHideDuration={3000}
        onClose={handleVallidationClose}>
        <Alert
          onClose={handleVallidationClose}
          severity="error"
          sx={{ width: "100%" }}>
          Please fill all the fields!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={saveSuccess}
        autoHideDuration={3000}
        onClose={handleSaveSuccess}>
        <Alert
          onClose={handleSaveSuccess}
          severity="success"
          sx={{ width: "100%" }}>
          Saved Successfully!
        </Alert>
      </Snackbar>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center">
        <Grid>
          <h1> Provider Registration </h1>
        </Grid>
      </Grid>
      <Divider />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center">
        <Grid xs={12} sm={6} md={6} lg={6} mt={1}>
          <TextField
            style={{ width: "95%" }}
            required
            label="Email"
            value={inputs.email}
            variant="standard"
            onChange={(event) => {
              handleInputChange("email", event.target.value);
            }}
          />
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={6} mt={1}>
          <TextField
            style={{ width: "95%" }}
            required
            label="First Name"
            value={inputs.firstName}
            variant="standard"
            onChange={(event) => {
              handleInputChange("firstName", event.target.value);
            }}
          />
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={6} mt={1}>
          <TextField
            style={{ width: "95%" }}
            label="Middle Name"
            value={inputs.middleName}
            variant="standard"
            onChange={(event) => {
              handleInputChange("middleName", event.target.value);
            }}
          />
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={6} mt={1}>
          <TextField
            style={{ width: "95%" }}
            required
            label="Last Name"
            value={inputs.lastName}
            variant="standard"
            onChange={(event) => {
              handleInputChange("lastName", event.target.value);
            }}
          />
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={6} mt={1}>
          <TextField
            style={{ width: "95%" }}
            label="Phone number"
            value={inputs.phoneNumber}
            variant="standard"
            onChange={(event) => {
              handleInputChange("phoneNumber", event.target.value);
            }}
          />
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center">
        <Grid sx={{ marginRight: "2.5%" }} mt={2}>
          <Button variant="outlined" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProviderRegistration;
