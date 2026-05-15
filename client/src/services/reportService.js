import api from "../api/axios.js";

export const reportService = {
  monthly: async (params = {}) => {
    const response = await api.get("/reports/monthly", { params, responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `expense-report-${params.year}-${String(params.month).padStart(2, "0")}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }
};
