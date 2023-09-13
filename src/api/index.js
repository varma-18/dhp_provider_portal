import axios from "axios";

export const AxiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export const SendMessageClient = axios.create({
  baseURL: process.env.REACT_APP_SEND_MESSAGE_URL,
});

export const CarePlanClient = axios.create({
  baseURL: process.env.REACT_APP_SEND_CAREPLAN_URL,
});
