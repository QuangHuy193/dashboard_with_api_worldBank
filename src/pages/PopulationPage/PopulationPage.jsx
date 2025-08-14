import { useState } from "react";
import LineChart from "../../components/Charts/LineChart/LineChart";
import { currentYear } from "../../utils/constant";
import FilterOptions from "../../components/FilterOptions/FilterOptions";
import classNames from "classnames/bind";
import styles from "./PopulationPage.module.scss";
import StatCard from "../../components/Cards/StatCard/StatCard";
import { fotmatNumber } from "../../utils/function";

const cx = classNames.bind(styles);

function PopulationPage({ setIsLoading }) {
  const [startYear, setStartYear] = useState(currentYear - 20);
  const [endYear, setEndYear] = useState(currentYear);
  const [selectedCountry, selectedSetCountry] = useState("WLD");
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const populationData = chartData.datasets?.[0]?.data || [];
  const years = chartData.labels || [];
  
  // Tổng dân số (nếu muốn cộng tất cả năm lại)
  const totalPopulation = populationData.reduce(
    (sum, val) => sum + (val || 0),
    0
  );

  // Tỉ lệ tăng trưởng (%) giữa các năm
  const growthRates = populationData.map((val, index, arr) => {
    if (index === 0) return null; // không có năm trước để so sánh
    const prev = arr[index - 1];
    if (!val || !prev) return null;
    return ((val - prev) / prev) * 100;
  });

  // Tỉ lệ tăng trưởng tổng thể từ năm đầu đến năm cuối
  const startPopulation = populationData[0] || 0;
  const endPopulation = populationData[populationData.length - 1] || 0;
  const totalGrowthRate = startPopulation
    ? ((endPopulation - startPopulation) / startPopulation) * 100
    : 0;

  // Tăng trưởng trung bình hàng năm (AAGR)
  const numberOfYears = populationData.length - 1;
  const averageAnnualGrowthRate = numberOfYears
    ? totalGrowthRate / numberOfYears
    : 0;

  return (
    <div>
      <FilterOptions
        yearMode="range"
        startYear={startYear}
        onStartYearChange={setStartYear}
        endYear={endYear}
        onEndYearChange={setEndYear}
        selectedCountry={selectedCountry}
        onCountryChange={selectedSetCountry}
      />
      <LineChart
        setIsLoading={setIsLoading}
        chartData={chartData}
        setChartData={setChartData}
        indicator="SP.POP.TOTL"
        countryCode={selectedCountry} // thêm countryCode
        startYear={startYear}
        endYear={endYear}
        chartTitle={
          <div className={cx("chart-title")}>
            {`Biểu đồ tăng trưởng dân số của ${selectedCountry} trong năm ${startYear} - ${endYear}`}
          </div>
        }
        datasetLabel="Dân số"
        color="green"
      />

      <StatCard title={"Tổng dân số"} value={fotmatNumber(totalPopulation)} />
      <StatCard
        title={"Tỉ lệ tăng trưởng theo năm"}
        value={fotmatNumber(growthRates)}
      />
      <StatCard
        title={"Tỉ lệ tăng trưởng tổng thể (%)"}
        value={fotmatNumber(totalGrowthRate)}
      />
      <StatCard
        title={"totalGrowthRate"}
        value={fotmatNumber(averageAnnualGrowthRate)}
      />
    </div>
  );
}

export default PopulationPage;
