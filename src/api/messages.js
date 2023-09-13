import { SendMessageClient } from ".";

export const sendQuickMessage = async (
  providerId,
  patientId,
  content,
  token
) => {
  return await SendMessageClient.post(
    `messages/provider/${providerId}/quick?patientId=${patientId}`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getPatientConversations = async (providerId, patientId, token) => {
  return await SendMessageClient.get(
    `/provider/${providerId}/conversations?patientId=${patientId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createNewConversation = async (
  providerId,
  patientId,
  topic,
  token
) => {
  return await SendMessageClient.post(
    `/provider/${providerId}/conversations`,
    { patientId, topic },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getConversationMessages = async (conversationId, token) => {
  return await SendMessageClient.get(`/conversations/${conversationId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sendMessage = async (msgData, token) => {
  return await SendMessageClient.post(`/messages`, msgData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
