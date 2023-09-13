import { Alert, Button, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";

export const CreatePatient = () => {
  const emptyValues = {
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "",
  };
  const [values, setValues] = useState(emptyValues);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = validate(values);
    setFieldErrors(errors);
    setSubmit(true);
    if (Object.keys(errors).length === 0 && submit) {
      setOpen(true);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const validate = (input) => {
    const errors = {};
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(input.email)) {
      errors.email = "Please enter valid email";
    }
    if (
      (input.phone.length >= 1 && input.phone.length < 10) ||
      input.phone.length > 10
    ) {
      errors.phone = "please enter valid phonenumber";
    }
    return errors;
  };
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center" }}>Registration</h2>
        <div
          className="label"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            sx={{ width: "25ch" }}
            required
            id="outlined-required"
            label="FirstName"
            type="text"
            onChange={handleChange}
            value={values.firstname}
            name="firstname"
          />
          <TextField
            sx={{ width: "25ch", marginTop: "2ch" }}
            id="outlined-basic"
            label="MiddleName"
            type="text"
            onChange={handleChange}
            value={values.middlename}
            name="middlename"
          />
          <TextField
            sx={{ width: "25ch", marginTop: "2ch" }}
            required
            id="outlined-required"
            label="LastName"
            type="text"
            onChange={handleChange}
            value={values.lastname}
            name="lastname"
          />
          <TextField
            sx={{ width: "25ch", marginTop: "2ch" }}
            required
            id="outlined-requires"
            label="Email"
            type="text"
            onChange={handleChange}
            value={values.email}
            name="email"
          />
          <p style={{ color: "red", padding: "0px", margin: "0px" }}>
            {fieldErrors.email}
          </p>
          <TextField
            sx={{ width: "25ch", marginTop: "2ch" }}
            id="outlined-basic"
            label="Phone"
            type="number"
            onChange={handleChange}
            value={values.phone}
            name="phone"
          />
          <p style={{ color: "red", padding: "0px", margin: "0px" }}>
            {fieldErrors.phone}
          </p>
          <TextField
            sx={{ width: "25ch", marginTop: "2ch" }}
            id="outlined-basic"
            label="City"
            type="text"
            onChange={handleChange}
            value={values.city}
            name="city"
          />
          <TextField
            sx={{ width: "25ch", marginTop: "2ch" }}
            id="outlined-basic"
            label="State"
            type="text"
            onChange={handleChange}
            value={values.state}
            name="state"
          />
          <TextField
            sx={{ width: "25ch", marginTop: "2ch" }}
            id="outlined-basic"
            label="Country"
            type="text"
            onChange={handleChange}
            value={values.country}
            name="country"
          />
        </div>
        <Button
          variant="contained"
          type="submit"
          sx={{ marginTop: "2ch", marginBottom: "4ch" }}
        >
          Submit
        </Button>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Registered successfully
        </Alert>
      </Snackbar>
    </div>
  );
};
