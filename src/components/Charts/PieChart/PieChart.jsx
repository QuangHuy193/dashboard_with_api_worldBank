import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { fetchWorldBankData } from "../../../services/api/worldbankAPI";
import { Card } from "antd";

export default function PieChart({ indicator, year, title }) {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    async function loadData() {
      const data = await fetchWorldBankData(indicator, year);
      setChartData({
        labels: data.map(d => d.country.value),
        datasets: [
          {
            data: data.map(d => d.value),
            backgroundColor: [
              "#1890ff",
              "#52c41a",
              "#faad14",
              "#f5222d",
              "#722ed1"
            ]
          }
        ]
      });
    }
    loadData();
  }, [indicator, year]);

  return (
    <Card title={`${title} (${year})`}>
      <Pie data={chartData} />
    </Card>
  );
}
