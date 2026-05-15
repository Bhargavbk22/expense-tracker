const colors = {
  success: "border-teal-200 bg-teal-50 text-teal-900",
  error: "border-red-200 bg-red-50 text-red-900",
  info: "border-blue-200 bg-blue-50 text-blue-900"
};

const Toast = ({ message, type = "success" }) => (
  <div className={`w-80 rounded-lg border px-4 py-3 text-sm shadow-soft ${colors[type] || colors.info}`}>
    {message}
  </div>
);

export default Toast;
