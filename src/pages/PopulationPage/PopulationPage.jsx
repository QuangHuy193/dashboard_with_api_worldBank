import { useState } from "react";
import LineChart from "../../components/Charts/LineChart/LineChart";
import { currentYear } from "../../utils/constant";
import FilterOptions from "../../components/FilterOptions/FilterOptions";
import classNames from "classnames/bind";
import styles from "./PopulationPage.module.scss";
import BarChart from "../../components/Charts/BarChart/BarChart";

const cx = classNames.bind(styles);

function PopulationPage({ setIsLoading }) {
  const [startYear, setStartYear] = useState(currentYear - 20);
  const [endYear, setEndYear] = useState(currentYear);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedCountry, selectedSetCountry] = useState("WLD");
  const [chartData1, setChartData1] = useState({ labels: [], datasets: [] });
  const [chartData2, setChartData2] = useState({ labels: [], datasets: [] });
  const [selectedTop, setSelectedTop] = useState(5);
  const [selectedType, setSelectedType] = useState(1);

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
      {/* chart 1 */}
      <LineChart
        setIsLoading={setIsLoading}
        chartData={chartData1}
        setChartData={setChartData1}
        indicator="SP.POP.TOTL"
        countryCode={selectedCountry}
        startYear={startYear}
        endYear={endYear}
        chartTitle={`Biểu đồ tăng trưởng dân số của ${selectedCountry} trong năm ${startYear} - ${endYear}`}
        datasetLabel="Dân số"
        color="green"
      />
      {/* chart 2 */}
      <FilterOptions
        yearMode="year"
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        selectedTop={selectedTop}
        onTopChange={setSelectedTop}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />
      <BarChart
        setIsLoading={setIsLoading}
        type={selectedType === 1 ? "top" : "bot"}
        chartData={chartData2}
        setChartData={setChartData2}
        indicator="SP.POP.TOTL"
        year={selectedYear}
        number={selectedTop}
        title={`Biểu đồ Top ${selectedTop} quốc gia có dân số cao nhất`}
        datasetLabel="Dân số"
      />
    </div>
  );
}

export default PopulationPage;
