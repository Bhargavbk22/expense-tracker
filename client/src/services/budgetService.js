import api from "../api/axios.js";

export const budgetService = {
  get: (params = {}) => api.get("/budget", { params }).then((res) => res.data),
  save: (payload) => api.post("/budget", payload).then((res) => res.data)
};
