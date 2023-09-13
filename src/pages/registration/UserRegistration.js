import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Alert, Snackbar } from "@mui/material";

export default function UserRegistration() {
  const initialValues = { email: "", password: "", confirmpassword: "" };
  const [formValues, SetFormValues] = useState(initialValues);
  const [formErrors, SetFormErrors] = useState({});
  const [isSubmit, SetIsSubmit] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = validate(formValues);
    SetFormErrors(errors);
    SetIsSubmit(true);
    if (Object.keys(errors).length === 0 && isSubmit) {
      setOpen(true);
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!values.email) {
      errors.email = "email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email";
    }
    if (!values.password) {
      errors.password = "password is required";
    } else if (values.password.length < 6) {
      errors.password = "password should be atleast 6 characters";
    }
    if (!values.confirmpassword) {
      errors.confirmpassword = "confirm Password is required";
    } else if (values.password !== values.confirmpassword) {
      errors.confirmpassword = "passwords don't match";
    }
    return errors;
  };
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };
  const formStyle = {
    width: "30%",
    border: "1px solid #dfdfdf",
    padding: "20px",
  };
  const errorMessageStyle = {
    color: "red",
    textAlign: "left",
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center" }}>UserRegistration</h2>
        <div
          className="label"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label style={{ textAlign: "left" }}>Email Id</label>
          <TextField
            sx={{ width: "25ch", alignContent: "left", marginTop: "1ch" }}
            id="outlined-basic"
            label="Email"
            type="text"
            onChange={handleChange}
            value={formValues.email}
            name="email"
          />
        </div>
        <p style={errorMessageStyle}>{formErrors.email}</p>
        <div
          className="label"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label style={{ textAlign: "left" }}>Password</label>
          <TextField
            sx={{ width: "25ch", alignContent: "left", marginTop: "1ch" }}
            id="outlined-basic"
            label="password"
            type="password"
            onChange={handleChange}
            value={formValues.password}
            name="password"
          />
        </div>
        <p style={errorMessageStyle}>{formErrors.password}</p>
        <div
          className="label"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label style={{ textAlign: "left" }}>Confirm Password</label>
          <TextField
            sx={{ width: "25ch", alignContent: "left", marginTop: "1ch" }}
            id="outlined-basic"
            label="confirm password"
            type="password"
            onChange={handleChange}
            value={formValues.confirmpassword}
            name="confirmpassword"
          />
        </div>
        <p style={errorMessageStyle}>{formErrors.confirmpassword}</p>
        <Button variant="contained" type="submit">
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
}
