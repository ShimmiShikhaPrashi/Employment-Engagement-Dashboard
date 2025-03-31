import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  CategoryScale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  CategoryScale
);

const RadarChart = () => {
  const data = {
    labels: [
      "Relationship Building",
      "Quality in Healthcare Delivery",
      "Situation Management",
      "Leadership",
    ],
    datasets: [
      {
        label: "Hospital Unit 1",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        data: [8, 1, 5, 2, 4, 10, 0, 0, 3, 5],
      },
      {
        label: "Hospital Unit 2",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        data: [10, 3, 4, 3, 5, 8, 7, 6, 4, 7],
      },
      {
        label: "Hospital Unit 3",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgb(153, 102, 255)",
        pointBackgroundColor: "rgb(153, 102, 255)",
        data: [0, 0, 1, 0, 0, 1, 0, 1, 2, 6],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      r: {
        min: 0,
        max: 10,
        pointLabels: {
          font: {
            size: 14,
            weight: "bold",
          },
          color: "gray",
        },
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "500px",
      }}
    >
      <div style={{ width: "100%", height: "100%" }}>
        <Radar data={data} options={options} />
      </div>
    </div>
  );
};

export default RadarChart;
