import api from "../api/axios.js";

export const analyticsService = {
  summary: (params = {}) => api.get("/analytics/summary", { params }).then((res) => res.data),
  monthly: (params = {}) => api.get("/analytics/monthly", { params }).then((res) => res.data),
  categories: (params = {}) => api.get("/analytics/categories", { params }).then((res) => res.data)
};
