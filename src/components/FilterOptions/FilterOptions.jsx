// FilterOptions.jsx
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import styles from "./FilterOptions.module.scss";
import classNames from "classnames/bind";
import { fetchCountriesOnce, years } from "../../utils/constant";

const cx = classNames.bind(styles);
const { Option } = Select;

export default function FilterOptions({
  yearMode = "single", // "single" hoặc "range"
  selectedYear,
  startYear,
  endYear,
  selectedCountry,
  onYearChange,
  onStartYearChange,
  onEndYearChange,
  onCountryChange,
}) {
  const [countriesList, setCountriesList] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      const countries = await fetchCountriesOnce();
      setCountriesList(countries);
    };
    getCountries();
  }, []);

  return (
    <div className={cx("option")}>
      {yearMode === "single" ? (
        <div className={cx("option-item")}>
          <label>Năm:</label>
          <Select value={selectedYear} style={{ width: 120 }} onChange={onYearChange}>
            {years.map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </div>
      ) : (
        <>
          <div className={cx("option-item")}>
            <label>Năm bắt đầu:</label>
            <Select value={startYear} style={{ width: 120 }} onChange={onStartYearChange}>
              {years.map((year) => (
                <Option key={year} value={year}>
                  {year}
                </Option>
              ))}
            </Select>
          </div>
          <div className={cx("option-item")}>
            <label>Năm kết thúc:</label>
            <Select value={endYear} style={{ width: 120 }} onChange={onEndYearChange}>
              {years.map((year) => (
                <Option key={year} value={year}>
                  {year}
                </Option>
              ))}
            </Select>
          </div>
        </>
      )}

      <div className={cx("option-item")}>
        <label>Quốc gia:</label>
        <Select
          value={selectedCountry}
          style={{ width: 150 }}
          onChange={onCountryChange}
        >
          {countriesList.map((country) => (
            <Option key={country.code} value={country.code}>
              {country.name}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
}
