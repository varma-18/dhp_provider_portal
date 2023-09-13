import {
  Button,
  Modal,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { token as access_tokem } from "../../store/authSlice";
import { createPatient } from "../../store/patientsSlice";
import { newPatientSchema, parseZodErrors } from "../../utils/zod-schema";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: { xs: "80%", md: "30%" },
  bgcolor: "background.paper",
  p: 4,
  borderRadius: 2,
  maxHeight: "90vh",
  overflowY: "scroll",
};

const initialInputs = {
  email: "",
  firstName: "",
  middleName: "",
  status: "",
  diagnosis: "",
  lastName: "",
  phoneNumber: "",
  age: "",
  height: "",
  heightUom: "cm",
  weight: "",
  weightUom: "kg",
  sex: "",
};

const initialErrors = {
  email: null,
  firstName: null,
  lastName: null,
  age: null,
  height: null,
  weight: null,
  sex: null,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomInput = ({
  name,
  label,
  type,
  onInputChange,
  inputs,
  errors,
  required,
}) => (
  <TextField
    required={required}
    sx={{ minWidth: { sm: "100%", lg: "45%" } }}
    onChange={(e) => {
      let { value } = e.target;
      onInputChange(
        name,
        type === "number" && value.trim() !== "" ? parseInt(value) : value
      );
    }}
    type={type || "text"}
    error={Boolean(errors[name])}
    helperText={errors[name]}
    value={inputs[name]}
    label={label}
  />
);

const CreatePatientModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const token = useSelector(access_tokem);

  const [inputs, setInputs] = useState(initialInputs);

  const [errors, setErrors] = useState(initialErrors);

  const [toastOpen, setToastOpen] = useState(false);

  const handleToastClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToastOpen(false);
  };

  const onInputChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const parsedInputs = newPatientSchema.safeParse(inputs);

    if (!parsedInputs.success) {
      setErrors((p) => ({ ...p, ...parseZodErrors(parsedInputs) }));
      return;
    }

    try {
      dispatch(createPatient({ patientData: inputs, token })).unwrap();
      setToastOpen(true);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const inputProps = { onInputChange, inputs, errors };

  const onClose = () => {
    setErrors(initialErrors);
    // TO clear inputs on close
    // setInputs(initialInputs);
    handleClose();
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={toastOpen}
        autoHideDuration={2000}
        onClose={handleToastClose}
      >
        <Alert
          onClose={handleToastClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Patient created successfully!
        </Alert>
      </Snackbar>
      <Modal open={open} onClose={onClose}>
        <Stack sx={style} spacing={3}>
          <Typography variant="h5" component="h2" alignSelf="center">
            Create a new Patient
          </Typography>
          <form
            noValidate
            onSubmit={onSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 15 }}
          >
            <Stack
              sapcing={2}
              rowGap={2}
              direction="row"
              flexWrap="wrap"
              justifyContent="space-around"
              alignItems="center"
            >
              <CustomInput
                required
                name="email"
                label="Email"
                {...inputProps}
              />
              <CustomInput
                required
                name="firstName"
                label="Firstname"
                {...inputProps}
              />
              <CustomInput
                name="middleName"
                label="Middlename"
                {...inputProps}
              />
              <CustomInput
                required
                name="lastName"
                label="Lastname"
                {...inputProps}
              />
              <CustomInput
                name="phoneNumber"
                label="Phonenumber"
                {...inputProps}
                type="number"
              />
              <CustomInput required name="sex" label="Sex" {...inputProps} />
              <CustomInput
                required
                name="age"
                label="Age"
                type="number"
                {...inputProps}
              />
              <CustomInput
                required
                name="height"
                label="Height (cm)"
                type="number"
                {...inputProps}
              />
              <CustomInput
                required
                name="weight"
                label="Weight (kg)"
                type="number"
                {...inputProps}
              />
              <CustomInput
                required
                name="status"
                label="Status"
                {...inputProps}
              />
              <CustomInput
                required
                name="diagnosis"
                label="Diagnosis"
                {...inputProps}
              />
            </Stack>
            <Button
              variant="contained"
              type="submit"
              color="secondary"
              sx={{ alignSelf: "center", width: "25%" }}
            >
              Create
            </Button>
          </form>
        </Stack>
      </Modal>
    </>
  );
};

export default CreatePatientModal;
