import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api/v1/users/chat",
  withCredentials: true, 
});
// Add interceptor to attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getUserChats = () => api.get("/sessions");

export const createChat = () => api.post("/sessions");

export const updateChatTitle = (sessionId, title) =>
  api.patch(`/sessions/${sessionId}`, { title });

export const getChatMessages  = (sessionId) =>
  api.get(`/messages/${sessionId}`);

export const sendMessage = (data) =>
  api.post("/messages", data);

export const getTopSearches = () =>
  api.get("/top-searches"); 

export const searchChats = (query) =>
  api.get("/search", { params: { keyword: query } });

export const getUserStats = () =>
  api.get("/stats");