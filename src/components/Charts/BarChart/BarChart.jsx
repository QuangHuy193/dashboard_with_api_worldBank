import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { fetchWorldBankData } from "../../../services/api/worldbankAPI";
import { Card } from "antd";

export default function BarChart({ indicator, year, title, top = 10, unit = "" }) {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    async function loadData() {
      const data = await fetchWorldBankData(indicator, year);
      const sorted = data.sort((a, b) => b.value - a.value).slice(0, top);
      setChartData({
        labels: sorted.map(d => d.country.value),
        datasets: [
          {
            label: title,
            data: sorted.map(d => d.value),
            backgroundColor: "#1890ff"
          }
        ]
      });
    }
    loadData();
  }, [indicator, year, title, top]);

  return (
    <Card title={`${title} (${year})`}>
      <Bar data={chartData} />
    </Card>
  );
}
