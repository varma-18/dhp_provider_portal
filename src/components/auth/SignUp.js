import {
  Button,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../store/authSlice";
import { parseZodErrors, signUpFormSchema } from "../../utils/zod-schema";

const CustomInput = ({
  name,
  label,
  type,
  onInputChange,
  inputs,
  errors,
  required,
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <TextField
      required={required}
      size={matches ? "small" : "medium"}
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
};

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: null,
    firstName: null,
    lastName: null,
    password: null,
    confirmPassword: null,
  });

  const onInputChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const inputProps = { onInputChange, inputs, errors };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const parsedInputs = signUpFormSchema.safeParse(inputs);

    if (!parsedInputs.success) {
      setErrors((p) => ({ ...p, ...parseZodErrors(parsedInputs) }));
      return;
    }
    if (inputs.password !== inputs.confirmPassword) {
      setErrors((p) => ({
        ...p,
        password: "passwords don't match",
        confirmPassword: "passwords don't match",
      }));
      return;
    }
    try {
      await dispatch(createUser(inputs)).unwrap();
      navigate("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSignUp} noValidate>
      <Stack spacing={2}>
        <CustomInput required name="email" label="Email" {...inputProps} />
        <CustomInput
          required
          name="firstName"
          label="First name"
          {...inputProps}
        />
        <CustomInput name="middleName" label="Middle name" {...inputProps} />
        <CustomInput
          required
          name="lastName"
          label="Last name"
          {...inputProps}
        />
        <CustomInput
          required
          type="password"
          name="password"
          label="Password"
          {...inputProps}
        />
        <CustomInput
          type="password"
          required
          name="confirmPassword"
          label="Confirm password"
          {...inputProps}
        />
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          type="submit">
          Sign Up
        </Button>
      </Stack>
    </form>
  );
};

export default SignUp;
