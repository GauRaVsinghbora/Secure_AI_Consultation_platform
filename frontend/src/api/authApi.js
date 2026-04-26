import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4001/api/v1/users",
    withCredentials: true,
});

export const getUser = () => api.get("/get-user");

export const googleLogin = async (token) => {
  const res = await api.post("/google-login", {
    token
  });

  return res.data;
};
export const logout = () => api.post("/logout");

export const contactUs = (data) => api.post("/contactus", data);