import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createNewCarePlan,
  getCareplanTemplateItems,
  getCareplanTemplates,
} from "../../api/careplan";
import { token as access_token } from "../../store/authSlice";
import CustomizePlanItem from "./CustomizePlanItem";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate3d(-50%, -50%,0)",
  bgcolor: "background.paper",
  p: 4,
  borderRadius: 2,
  maxHeight: "100vh",
  overflowY: "auto",
  minWidth: { xs: "90%", sm: "70%", md: "50%", lg: "40%", xl: "30%" },
};

const initialInputs = { name: "", description: "" };

const CreateCarePlan = ({ open, handleClose }) => {
  const { id: patientId } = useParams();
  const [planData, setPlanData] = useState(initialInputs);
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const token = useSelector(access_token);
  const [templates, setTemplates] = useState([]);
  const [defaultTemplateItems, setDefaultTemplateItems] = useState([]);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [newPlanItems, setNewPlanItems] = useState([]);
  const [itemModalMode, setItemModalMode] = useState("");
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [editItemData, setEditItemData] = useState(null);
  const handleItemModalOpen = () => setItemModalOpen(true);
  const handleItemModalClose = () => setItemModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlanData((prev) => ({ ...prev, [name]: value }));
  };

  const createCarePlanTemplate = async () => {
    try {
      await createNewCarePlan(
        patientId,
        {
          ...planData,
          carePlanItems: [
            ...newPlanItems
              .filter((item) => selectedItemIds.includes(item.id))
              .map((item) => ({
                name: item.name,
                description: item.description,
                title: item.title,
                content: item.content,
              })),
          ],
        },
        token
      );
    } catch (error) {
      console.log(error);
    }
    handleClose({ refetch: true });
  };

  useEffect(() => {
    if (selectedTemplateId !== "") {
      const template = templates.find((t) => t.id === selectedTemplateId);
      setPlanData({
        name: template.name,
        description: template.description,
      });

      (async () => {
        try {
          const data = await getCareplanTemplateItems(
            selectedTemplateId,
            token
          );
          const parsedData = data.carePlanItems.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            title: item.title,
            content: item.content,
          }));
          setDefaultTemplateItems(parsedData);
          setNewPlanItems(parsedData);
          setSelectedItemIds(parsedData.map((_, idx) => idx));
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [selectedTemplateId, token]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getCareplanTemplates(token);
        setTemplates(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [token]);

  return (
    <>
      <CustomizePlanItem
        open={itemModalOpen}
        handleClose={handleItemModalClose}
        mode={itemModalMode}
        data={editItemData}
        handleCreate={(data) => {
          setNewPlanItems((prev) => {
            const idx = prev.length;
            setSelectedItemIds((prev) => [...prev, idx]);
            return [...prev, { ...data, id: idx }];
          });
        }}
        handleEdit={(data) => {
          setNewPlanItems((prev) =>
            prev.map((item) => (item.id === data.id ? data : item))
          );
        }}
      />
      <Modal open={open} onClose={handleClose}>
        <Stack sx={style} spacing={2}>
          <Typography variant="h6" alignSelf="center">
            Create a new care plan
          </Typography>
          <Stack spacing={2}>
            <TextField
              value={planData.name}
              name="name"
              label="Template Name"
              onChange={handleInputChange}
            />
            <TextField
              value={planData.description}
              name="description"
              label="Description"
              onChange={handleInputChange}
            />
            <FormControl>
              <InputLabel id="select-template-label">
                Choose a template
              </InputLabel>
              <Select
                label="Choose a template"
                labelId="select-template-label"
                sx={{ minWidth: "10%" }}
                value={selectedTemplateId}
                onChange={(e) => {
                  setSelectedTemplateId(e.target.value);
                }}>
                {templates?.map((template) => (
                  <MenuItem key={template.id} value={template.id}>
                    {template.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack direction="row" spacing={2} alignSelf="flex-end">
            {selectedTemplateId !== "" && (
              <Button
                color="warning"
                onClick={() => {
                  setNewPlanItems(defaultTemplateItems);
                  setSelectedItemIds(defaultTemplateItems.map((_, idx) => idx));
                }}
                variant="outlined"
                sx={{
                  width: "fit-content",
                  textTransform: "none",
                }}>
                Reset
              </Button>
            )}
            <Button
              onClick={() => {
                setItemModalMode("create");
                setEditItemData(null);
                handleItemModalOpen();
              }}
              variant="contained"
              sx={{
                width: "fit-content",
                textTransform: "none",
              }}>
              Add item
            </Button>
          </Stack>
          <Stack
            direction={{ md: "column", lg: "row" }}
            flexWrap="wrap"
            gap={2}
            justifyContent="space-evenly">
            {newPlanItems?.map((item, idx) => {
              item.id = idx;
              return (
                <Box
                  key={idx}
                  display="flex"
                  alignItems="center"
                  gap={{ lg: 1, xl: 2 }}
                  width={{ md: "100%", lg: "45%" }}
                  borderRadius={2}
                  border={1}
                  borderColor="#d6d6d6"
                  py={1}
                  bgcolor="#d7ebff"
                  px={{ lg: 1, xl: 2 }}>
                  <Checkbox
                    checked={selectedItemIds.includes(item.id)}
                    onChange={({ target: { checked } }) => {
                      checked
                        ? setSelectedItemIds((prev) => [...prev, item.id])
                        : setSelectedItemIds((prev) =>
                            prev.filter((i) => i !== item.id)
                          );
                    }}
                  />
                  <Stack
                    direction="row"
                    alignItems="center"
                    flexGrow={1}
                    justifyContent="space-between">
                    <Typography maxWidth="80%">{item.name}</Typography>
                    <BiEdit
                      style={{ justifySelf: "end" }}
                      size={20}
                      cursor="pointer"
                      onClick={() => {
                        setItemModalMode("edit");
                        setEditItemData(item);
                        handleItemModalOpen();
                      }}
                    />
                  </Stack>
                </Box>
              );
            })}
          </Stack>
          <Stack direction="row" spacing={2} alignSelf="center">
            <Button
              type="button"
              variant="outlined"
              color="error"
              onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              onClick={createCarePlanTemplate}>
              Create
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};

export default CreateCarePlan;
