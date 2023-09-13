import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/authSlice";
import { loginFormSchema, parseZodErrors } from "../../utils/zod-schema";

const Login = ({ displayToast }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({ email: "", password: "" });

  const [errors, setErrors] = useState({ email: null, password: null });

  const onInputChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const parsedInputs = loginFormSchema.safeParse(inputs);

    if (!parsedInputs.success) {
      setErrors((p) => ({ ...p, ...parseZodErrors(parsedInputs) }));
      return;
    }

    try {
      await dispatch(loginUser({ ...inputs, type: "provider" })).unwrap();
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      displayToast({
        message: "Incorrect email or password!",
        type: "error",
      });
    }
  };

  return (
    <form onSubmit={handleLogin} noValidate>
      <Stack spacing={2}>
        <TextField
          required
          sx={{ minWidth: { sm: "100%", lg: "45%" } }}
          onChange={(e) => {
            onInputChange("email", e.target.value);
          }}
          type="email"
          error={Boolean(errors["email"])}
          helperText={errors["email"]}
          value={inputs["email"]}
          label="Email"
        />
        <TextField
          required
          sx={{ minWidth: { sm: "100%", lg: "45%" } }}
          onChange={(e) => {
            onInputChange("password", e.target.value);
          }}
          type="password"
          error={Boolean(errors["password"])}
          helperText={errors["password"]}
          value={inputs["password"]}
          label="Password"
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ textTransform: "none" }}>
          Login
        </Button>
      </Stack>
    </form>
  );
};

export default Login;
