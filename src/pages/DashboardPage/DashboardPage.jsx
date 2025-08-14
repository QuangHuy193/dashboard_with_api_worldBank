import styles from "./DashboardPage.module.scss";
import classNames from "classnames/bind";
import StatCard from "../../components/Cards/StatCard/StatCard";
import { useEffect, useState } from "react";
import {
  statsConfig,
  years,
  countries,
  initCountries,
} from "../../utils/constant";
import { Select } from "antd";
import { fetchWorldBankData } from "../../services/api/worldbankAPI";

const { Option } = Select;
const cx = classNames.bind(styles);

export default function Dashboard({ setIsLoading }) {
  const currentYear = new Date().getFullYear();
  const [selectedYear, selectedSetYear] = useState(currentYear);
  const [selectedCountry, selectedSetCountry] = useState("WLD");
  const [countriesList, setCountriesList] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    initCountries().then(() => {
      setCountriesList(countries);
    });
  }, []);

  useEffect(() => {
    async function fetchStats(selectedYear = "2025", selectedCountry = "WLD") {
      setIsLoading(true);
      const promises = statsConfig.map(async (item) => {
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
      <div className={cx("option")}>
        <div className={cx("option-item")}>
          <label>Dữ liệu của năm:</label>
          <Select
            defaultValue={selectedYear}
            style={{ width: 120 }}
            onChange={(value) => {
              selectedSetYear(value);
            }}
          >
            {years.map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </div>

        <div className={cx("option-item")}>
          <label>Dữ liệu của quốc gia:</label>
          <Select
            defaultValue={selectedCountry}
            style={{ width: 120 }}
            onChange={(value) => {
              selectedSetCountry(value);
            }}
          >
            {countriesList.map((country) => (
              <Option key={country.code} value={country.code}>
                {country.name}
              </Option>
            ))}
          </Select>
        </div>
      </div>

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
