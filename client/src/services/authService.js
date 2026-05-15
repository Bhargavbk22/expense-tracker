import api from "../api/axios.js";

export const authService = {
  register: (payload) => api.post("/auth/register", payload).then((res) => res.data),
  login: (payload) => api.post("/auth/login", payload).then((res) => res.data),
  profile: () => api.get("/auth/profile").then((res) => res.data),
  logout: () => api.post("/auth/logout").then((res) => res.data)
};
