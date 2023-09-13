import { Button, Modal, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { token as access_token } from "../../store/authSlice";
import {
  createPatientInvite,
  fetchInviteDetails,
  findPatientById,
} from "../../store/patientsSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 4,
  borderRadius: 2,
  maxHeight: "90vh",
  minWidth: "30%",
};

const InvitePatientsModal = ({ open, handleClose, patientId }) => {
  const token = useSelector(access_token);
  const patient = useSelector((state) => findPatientById(state, patientId));
  const dispatch = useDispatch();

  useEffect(() => {
    if (open && !patient?.inviteCode) {
      dispatch(fetchInviteDetails({ id: patientId, token })).unwrap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Stack sx={style} spacing={2} alignItems="center">
        <span style={{ fontSize: 25, fontWeight: "600" }}>
          Invite{" "}
          <span style={{ color: "#0b6fca" }}>
            {patient?.firstName} {patient?.lastName}
          </span>
        </span>
        <span style={{ marginTop: 30, marginBottom: 20, fontSize: 18 }}>
          {patient?.inviteCode ? patient?.inviteCode : "No invite code found"}
        </span>
        <Stack
          direction="row"
          width="100%"
          justifyContent="space-around"
          alignItems="center"
          spacing={4}>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Close
          </Button>
          <Button
            disabled={Boolean(patient?.inviteCode)}
            variant="contained"
            color="secondary"
            onClick={() =>
              dispatch(createPatientInvite({ id: patient?.id, token }))
            }>
            Create
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default InvitePatientsModal;
