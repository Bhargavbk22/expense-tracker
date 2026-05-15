import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { monthOptions } from "../../utils/constants.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MonthlyBarChart = ({ data = [] }) => {
  const chartData = {
    labels: monthOptions.map((month) => month.slice(0, 3)),
    datasets: [
      { label: "Income", data: data.map((item) => item.income), backgroundColor: "#0f766e", borderRadius: 6 },
      { label: "Expenses", data: data.map((item) => item.expenses), backgroundColor: "#e85d4f", borderRadius: 6 }
    ]
  };

  return <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } }} />;
};

export default MonthlyBarChart;
