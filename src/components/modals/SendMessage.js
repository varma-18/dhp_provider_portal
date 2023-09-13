import { Button, Popover, Snackbar, TextField } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { sendQuickMessage } from "../../api/messages";
import {
  selectCurrentUser,
  token as access_token,
} from "../../store/authSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SendMessage = (props) => {
  const token = useSelector(access_token);
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const currentUser = useSelector(selectCurrentUser);

  const handleClose = () => {
    setMessage("");
    props.handleClose();
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSend = async () => {
    const res = await sendQuickMessage(
      currentUser.userId,
      props.patient.userId,
      message,
      token
    );
    if (res.status === 200 || res.status === 201) {
      setSnackbarMessage("Message sent successfully");
    } else {
      setSnackbarMessage("Error sending message");
    }
    setSnackbarOpen(true);
    handleClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Popover
        open={Boolean(props.anchorEl)}
        anchorEl={props.anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}>
        <div style={{ padding: "16px" }}>
          <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
            Send Message to {props.patient.firstName} {props.patient.middleName}{" "}
            {props.patient.lastName}
          </div>
          <TextField
            autoFocus
            margin="dense"
            label="Type Here..."
            fullWidth
            value={message}
            onChange={handleChange}
          />
          <Button onClick={handleSend} disabled={!message}>
            Send
          </Button>
        </div>
      </Popover>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SendMessage;
