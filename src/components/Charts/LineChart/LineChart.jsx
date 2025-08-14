import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { fetchWorldBankDataRange } from "../../../services/api/worldbankAPI";
import { Card } from "antd";
import { fotmatNumber } from "../../../utils/function";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({
  setIsLoading,
  chartData,
  setChartData,
  indicator,
  countryCode,
  startYear,
  endYear,
  chartTitle,
  datasetLabel,
  color = "blue",
}) {
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const results = await fetchWorldBankDataRange(
        countryCode,
        indicator,
        startYear,
        endYear
      );
      setIsLoading(false);
      const years = results.map((item) => item.year);
      const values = results.map((item) =>        
        item.value !== "N/A" ? Number(item.value.replace(/,/g, "")) : null
      );

      setChartData({
        labels: years,
        datasets: [
          {
            label: datasetLabel,
            data: values,
            borderColor: color,
            fill: false,
          },
        ],
      });
    }

    loadData();
  }, [indicator, startYear, endYear, countryCode, datasetLabel, color]);

  return (
    <Card title={chartTitle}>
      {chartData.datasets.length > 0 ? (
        <Line data={chartData} />
      ) : (
        <p>Đang tải dữ liệu...</p>
      )}
    </Card>
  );
}
