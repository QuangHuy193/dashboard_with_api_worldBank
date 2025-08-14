import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { fetchWorldBankData } from "../../../services/api/worldbankAPI";
import { Card } from "antd";

export default function LineChart({ indicator, startYear, endYear, title, color = "blue" }) {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    async function loadData() {
      const years = [];
      const values = [];
      for (let year = startYear; year <= endYear; year++) {
        const data = await fetchWorldBankData(indicator, year);
        const world = data.find(d => d.country.id === "WLD");
        if (world) {
          years.push(year);
          values.push(world.value);
        }
      }
      setChartData({
        labels: years,
        datasets: [
          {
            label: title,
            data: values,
            borderColor: color,
            fill: false
          }
        ]
      });
    }
    loadData();
  }, [indicator, startYear, endYear, title, color]);

  return (
    <Card title={title}>
      <Line data={chartData} />
    </Card>
  );
}
