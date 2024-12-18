import React from "react";
import { Bar } from "react-chartjs-2";
<<<<<<< HEAD
=======
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// تسجيل المكونات
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
>>>>>>> 4349cf8b4c4f9cbfd5b24f5d5bfbfdfead8c0697

const Chart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Dataset 1",
        data: [50, 40, 60, 80, 30, 70, 90],
        backgroundColor: "#333",
      },
      {
        label: "Dataset 2",
        data: [30, 60, 50, 70, 40, 60, 100],
        backgroundColor: "#28a745",
      },
    ],
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Bar data={data} />
    </div>
  );
};

export default Chart;
