import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4001/api/v1/users/chat",
  withCredentials: true,
});

export const getUserChats = () => api.get("/sessions");

export const createChat = () => api.post("/sessions");

export const updateChatTitle = (sessionId, title) =>
  api.patch(`/sessions/${sessionId}`, { title });

export const getChatMessages  = (sessionId) =>
  api.get(`/messages/${sessionId}`);

export const sendMessage = (data) =>
  api.post("/messages", data);