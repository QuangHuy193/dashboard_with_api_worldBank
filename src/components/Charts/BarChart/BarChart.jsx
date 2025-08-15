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
import { useEffect } from "react";
import { fetchWorldBankDataTop } from "../../../services/api/worldbankAPI";
import { Card } from "antd";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({
  setIsLoading,
  chartData,
  setChartData,
  indicator,
  year,
  title,
  type, //top or bot
  number = 10,
  datasetLabel,
  unit = "",
}) {
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const data = await fetchWorldBankDataTop(indicator, year,type, number);
      setIsLoading(false);
      setChartData({
        labels: data.map((d) => d.country),
        datasets: [
          {
            label: datasetLabel,
            data: data.map((d) => d.value),
            backgroundColor: "#1890ff",
          },
        ],
      });
    }
    loadData();
  }, [indicator, year, title, number, type]);

  return (
    <Card>
      <div className="chart-title">{title}</div>
      <Bar data={chartData} />
    </Card>
  );
}
