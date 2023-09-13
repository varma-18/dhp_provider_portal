import {
  Alert as MuiAlert,
  Box,
  Snackbar,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiFillFacebook } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { SiOkta } from "react-icons/si";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import { getUserDetails, updateUser } from "../store/authSlice";

const getOAuthURL = (provider) => {
  return `${process.env.REACT_APP_BACKEND_URL}/oauth/authorize?source=pivot_portal&provider=${provider}`;
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = useState(0);

  const [toastOptions, setToastOptions] = useState({
    open: false,
    message: null,
    type: "success",
  });

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToastOptions((p) => ({ ...p, open: false }));
  };

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const redirectToNextStep = async (userData) => {
    if (!userData.roles) {
      // Error later
    } else {
      if (userData.userProfileExists === "true") {
        try {
          dispatch(
            getUserDetails({ id: userData.id, token: userData.token })
          ).unwrap();
        } catch (error) {
          console.log(error);
          navigate("/");
        }
      } else {
        let firstName = "";
        let lastName = "";
        const userNames = userData.userName ? userData.userName.split(" ") : [];
        if (userNames.length > 0) {
          firstName = userNames[0];
        }
        if (userNames.length > 1) {
          lastName = userNames[1];
        }
        dispatch(updateUser({ ...userData, firstName, lastName }));
        navigate("/complete-profile");
      }
    }
  };

  const displayToast = (options) => {
    setToastOptions({ open: true, ...options });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("access_token");
    const userName = searchParams.get("name");
    const userProfileExists = searchParams.get("user_profile_exists");
    const email = searchParams.get("email");
    const id = searchParams.get("id");
    const iamId = searchParams.get("iamId");
    const provider = searchParams.get("provider");

    let user_data = {
      token,
      userProfileExists,
      userName,
      email,
      id,
      iamId,
      provider,
      roles: ["ROLE_USER"],
    };

    if (token) {
      dispatch(updateUser(user_data));
      redirectToNextStep(user_data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={toastOptions.open}
        autoHideDuration={2000}
        onClose={handleToastClose}>
        <Alert
          onClose={handleToastClose}
          severity={toastOptions.type}
          sx={{ width: "100%" }}>
          {toastOptions.message}
        </Alert>
      </Snackbar>
      <Box
        height="100vh"
        justifyContent="center"
        display="flex"
        alignItems="center">
        <Stack
          minWidth={{ xs: "70%", sm: "40% ", md: "30%", lg: "25%", xl: "20%" }}
          spacing={{ xs: 2, md: 3 }}
          mt={{ xs: 3, md: 0 }}
          minHeight="70vh">
          <>
            <Tabs variant="fullWidth" value={value} onChange={handleChange}>
              <Tab
                sx={{ fontSize: { xs: 14, md: 16 }, fontWeight: "600" }}
                label="Login"
              />
              <Tab
                sx={{ fontSize: { xs: 14, md: 16 }, fontWeight: "600" }}
                label="Sign Up"
              />
            </Tabs>
          </>
          <>
            {value === 0 ? <Login displayToast={displayToast} /> : null}
            {value === 1 ? <SignUp displayToast={displayToast} /> : null}
          </>
          <span
            style={{ alignSelf: "center", fontSize: 16, fontWeight: "600" }}>
            or {value === 0 ? "login" : "sign up"} using
          </span>
          <Stack direction="row" spacing={3} alignSelf="center">
            <a href={getOAuthURL("github")}>
              <BsGithub size={25} color="black" />
            </a>
            <a href={getOAuthURL("google")}>
              <FcGoogle size={25} />
            </a>
            <a href={getOAuthURL("facebook")}>
              <AiFillFacebook size={25} />
            </a>
            <a href={getOAuthURL("okta")}>
              <SiOkta size={25} />
            </a>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Auth;
