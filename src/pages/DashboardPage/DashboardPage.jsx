import styles from "./DashboardPage.module.scss";
import classNames from "classnames/bind";
import StatCard from "../../components/Cards/StatCard/StatCard";
import { useEffect, useState } from "react";
import {
  currentYear,
  statsConfigInDashboard,
} from "../../utils/constant";
import { fetchWorldBankData } from "../../services/api/worldbankAPI";
import FilterOptions from "../../components/FilterOptions/FilterOptions";

const cx = classNames.bind(styles);

export default function Dashboard({ setIsLoading }) {
  const [selectedYear, selectedSetYear] = useState(currentYear);
  const [selectedCountry, selectedSetCountry] = useState("WLD");
  const [stats, setStats] = useState([]);

  useEffect(() => {
    async function fetchStats(selectedYear = "2025", selectedCountry = "WLD") {
      setIsLoading(true);
      const promises = statsConfigInDashboard.map(async (item) => {
        const value = await fetchWorldBankData(
          selectedCountry,
          item.code,
          selectedYear
        );
        return { ...item, value };
      });
      const results = await Promise.all(promises);
      setStats(results);
      setIsLoading(false);
    }

    fetchStats(selectedYear, selectedCountry);
  }, [selectedYear, selectedCountry]);

  return (
    <div className={cx("container")}>
      <FilterOptions          
        selectedYear={selectedYear}
        selectedCountry={selectedCountry}
        onYearChange={selectedSetYear}
        onCountryChange={selectedSetCountry}
      />

      <div className={cx("card-container")}>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value === "N/A" ? "Không có dữ liệu" : stat.value}
            icon={stat.icon}
          />
        ))}
      </div>
    </div>
  );
}
