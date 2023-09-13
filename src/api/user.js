import { AxiosClient } from ".";

export const createNewUser = async (providerData) => {
  const { data } = await AxiosClient.post("/providers", providerData);
  return data;
};

export const getUserInfo = async (userId, token) => {
  const { data } = await AxiosClient.get(`/providers/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const loginUserWithPassword = async (userData) => {
  const { data } = await AxiosClient.post(`/users/login`, userData);
  return data;
};
