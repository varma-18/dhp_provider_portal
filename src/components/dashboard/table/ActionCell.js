import { Badge, Chip } from "@mui/material";
import { useState } from "react";
import { SiGooglemessages } from "react-icons/si";
import { Table } from "rsuite";
import InvitePatientsModal from "../../modals/InvitePatientsModal";
import SendMessage from "../../modals/SendMessage";

const { Cell } = Table;

const ActionCell = ({ rowData, dataKey, theme, ...props }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <InvitePatientsModal
        open={open}
        handleClose={() => setOpen(false)}
        patientId={rowData.id}
      />
      <SendMessage
        anchorEl={anchorEl}
        handleClose={handleClose}
        patient={rowData}
      />
      <Cell
        {...props}
        style={{
          display: "flex",
          // justifyContent: "space-evenly",
          alignItems: "center",
          maxWidth: "60%",
          gap: 20,
        }}>
        {/* <Chip clickable label="View" variant="outlined" color={theme.color} /> */}
        <Chip
          clickable
          icon={
            <Badge color={theme.badgeColor} variant="dot">
              <SiGooglemessages fontSize={16} color={theme.iconColor} />
            </Badge>
          }
          label="Messages"
          color={theme.color}
          variant="outlined"
          onClick={handleOpen}
        />

        {/* <Chip clickable label="Goals" variant="outlined" color={theme.color} /> */}
        <Chip
          clickable
          label="Invite"
          variant="outlined"
          color={theme.color}
          onClick={() => setOpen(true)}
        />
      </Cell>
    </>
  );
};

export default ActionCell;
