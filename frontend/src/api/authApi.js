import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + "/api/v1/users",
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

export const getUser = () => api.get("/get-user");

export const googleLogin = async (token) => {
  const res = await api.post("/google-login", {
    token
  });

  return res.data;
};
export const logout = () => api.post("/logout");

export const contactUs = (data) => api.post("/contactus", data);