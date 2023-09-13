import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";

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
const CreateConversation = ({ open, handleClose, createConversation }) => {
  const [topic, setTopic] = useState("");
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
          onSubmit={(e) => {
            e.preventDefault();
            createConversation(topic);
            setTopic("");
            handleClose();
          }}>
          <Typography variant="h6" alignSelf="center">
            Create a new conversation
          </Typography>
          <TextField
            label="Topic"
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
            }}
          />
          <Button type="submit" variant="contained" color="secondary">
            Create
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateConversation;
