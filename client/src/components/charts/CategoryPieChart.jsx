import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = ({ data = [] }) => {
  const chartData = {
    labels: data.map((item) => item._id),
    datasets: [
      {
        data: data.map((item) => item.total),
        backgroundColor: ["#0f766e", "#e85d4f", "#f59e0b", "#2563eb", "#7c3aed", "#0891b2", "#65a30d", "#be123c"]
      }
    ]
  };

  return <Doughnut data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } }} />;
};

export default CategoryPieChart;
