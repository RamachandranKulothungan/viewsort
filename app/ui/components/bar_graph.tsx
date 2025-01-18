"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({
  yValues,
  color,
  algorithm,
}: {
  yValues: number[];
  color: string;
  algorithm: string;
}) {
  var arrLength = yValues.length;
  var xValues = Array.from({ length: arrLength }, () => "");

  var barColors = Array.from({ length: arrLength }, () => color);
  const data = {
    labels: xValues,
    datasets: [
      {
        label: algorithm,
        backgroundColor: barColors,
        data: yValues,
      },
    ],
  };

  return (
    <>
      <Bar data={data} />
    </>
  );
}
