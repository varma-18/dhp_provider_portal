import { Button, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 4,
  borderRadius: 2,
  maxHeight: "100vh",
  minWidth: "40%",
};

const initialInputs = { name: "", description: "", title: "", content: "" };

const CustomizePlanItem = ({
  open,
  mode,
  handleClose,
  handleCreate,
  handleEdit,
  data,
}) => {
  const [itemData, setItemData] = useState(initialInputs);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (data) {
      setItemData(data);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    mode === "create" ? handleCreate(itemData) : handleEdit(itemData);
    setItemData(initialInputs);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setItemData(initialInputs);
        handleClose();
      }}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" textAlign="center">
          {mode === "create" ? "Add item" : "Edit item"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} mt={2}>
            <TextField
              name="name"
              onChange={handleInputChange}
              value={itemData.name}
              label="Name"
            />
            <TextField
              name="description"
              onChange={handleInputChange}
              value={itemData.description}
              label="Description"
            />
            <TextField
              name="title"
              onChange={handleInputChange}
              value={itemData.title}
              label="Title"
            />
            <TextField
              name="content"
              onChange={handleInputChange}
              value={itemData.content}
              label="Content"
            />
            <Stack direction="row" justifyContent="space-evenly">
              <Button
                type="button"
                variant="outlined"
                color="error"
                onClick={() => {
                  setItemData(initialInputs);
                  handleClose();
                }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="secondary">
                Save
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default CustomizePlanItem;
