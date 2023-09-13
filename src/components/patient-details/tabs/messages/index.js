import {
  Alert,
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { useSelector } from "react-redux";
import {
  createNewConversation,
  getConversationMessages,
  getPatientConversations,
  sendMessage,
} from "../../../../api/messages";
import { selectCurrentUser } from "../../../../store/authSlice";
import CreateConversation from "../../../modals/CreateConversation";

const MsgDayInfo = ({ day }) => (
  <Typography
    sx={{
      alignSelf: "center",
      px: 1.3,
      py: 0.2,
      borderRadius: 2,
      bgcolor: "turquoise",
      my: 2,
      fontSize: 14,
    }}>
    {day}
  </Typography>
);

const PatientMessages = ({ patient }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(0);
  const currentUser = useSelector(selectCurrentUser);
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [input, setInput] = useState("");

  const getMessages = async () => {
    try {
      const { data } = await getConversationMessages(
        selectedConversationId,
        currentUser.token
      );
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (patient) {
      (async () => {
        try {
          const { data } = await getPatientConversations(
            currentUser.userId,
            patient.userId,
            currentUser.token
          );
          setConversations(data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [currentUser.token, currentUser.userId, patient]);

  useEffect(() => {
    if (selectedConversationId === 0) return;
    const interval = setInterval(async () => {
      await getMessages();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.token, selectedConversationId]);

  const createConversation = async (topic) => {
    try {
      const { data } = await createNewConversation(
        currentUser.userId,
        patient.userId,
        topic,
        currentUser.token
      );
      setConversations((prev) => [...prev, data]);
      setSelectedConversationId(data.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const { data } = await sendMessage(
        {
          senderId: currentUser.userId,
          conversationId: selectedConversationId,
          content: input,
        },
        currentUser.token
      );
      setMessages((prev) => [...prev, data]);
    } catch (error) {
      console.log(error);
    }
    setInput("");
  };

  return (
    <>
      <CreateConversation
        open={open}
        createConversation={createConversation}
        handleClose={handleClose}
      />
      <Stack spacing={2} p={2} height="100%">
        <Stack direction="row" alignItems="center" spacing={3}>
          <Select
            sx={{ minWidth: "15%" }}
            disabled={conversations.length === 0}
            value={selectedConversationId}
            onChange={(e) => {
              setSelectedConversationId(e.target.value);
            }}>
            {conversations.map((convo) => (
              <MenuItem key={convo.id} value={convo.id}>
                {convo.topic}
              </MenuItem>
            ))}
          </Select>
          <Button variant="outlined" onClick={handleOpen}>
            <MdAdd /> Create new conversation
          </Button>
        </Stack>
        <Stack spacing={2} height="100%">
          <Stack
            height="100%"
            spacing={1}
            py={2}
            px={1}
            justifyContent={
              selectedConversationId && messages.length !== 0 ? "end" : "center"
            }>
            {!selectedConversationId && (
              <Alert
                variant="outlined"
                severity="info"
                sx={{ width: "fit-content", alignSelf: "center" }}>
                Please select or create a conversation to view it's messages
              </Alert>
            )}
            {selectedConversationId && messages.length <= 0 ? (
              <Alert
                variant="outlined"
                severity="info"
                sx={{ width: "fit-content", alignSelf: "center" }}>
                No messages to show, start by saying HI 👋
              </Alert>
            ) : null}
            {messages.map((msg, idx) => {
              msg.isOwnMsg = msg.senderId === currentUser.userId;
              msg.currentMsgTime = new Date(msg.createdAt);
              msg.lastMsgTime = new Date(messages[idx - 1]?.createdAt);
              msg.msgSentToday =
                new Date().toDateString() === msg.currentMsgTime.toDateString();
              msg.isNewDateMsg =
                msg.currentMsgTime.toDateString() !==
                msg.lastMsgTime.toDateString();
              return (
                <React.Fragment key={msg.id}>
                  {msg.msgSentToday && msg.isNewDateMsg && (
                    <MsgDayInfo day="Today" />
                  )}
                  {msg.isNewDateMsg && !msg.msgSentToday && (
                    <MsgDayInfo
                      day={format(new Date(msg.updatedAt), "do MMM yyyy")}
                    />
                  )}
                  <Stack
                    key={msg.id}
                    bgcolor={msg.isOwnMsg ? "lightgray" : "violet"}
                    alignSelf={msg.isOwnMsg ? "flex-end" : "flex-start"}
                    px={2}
                    py={1}
                    spacing={0.5}
                    borderRadius={2}
                    width="fit-content">
                    <Typography>{msg.content}</Typography>
                    <Typography
                      variant="caption"
                      fontSize={12}
                      sx={{ alignSelf: "end" }}>
                      {Intl.DateTimeFormat("en-us", {
                        timeStyle: "short",
                        hour12: true,
                      }).format(new Date(msg.createdAt))}
                    </Typography>
                  </Stack>
                </React.Fragment>
              );
            })}
          </Stack>
          <form
            onSubmit={handleSendMessage}
            style={{
              display: "flex",
              gap: 15,
              alignItems: "center",
            }}>
            <TextField
              size="small"
              disabled={!selectedConversationId}
              placeholder="Send a message"
              sx={{ flexGrow: 1 }}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <IoSend
              disabled={!selectedConversationId}
              style={{ cursor: "pointer" }}
              size={20}
              onClick={handleSendMessage}
            />
          </form>
        </Stack>
      </Stack>
    </>
  );
};

export default PatientMessages;
