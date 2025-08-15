// FilterOptions.jsx
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import styles from "./FilterOptions.module.scss";
import classNames from "classnames/bind";
import {
  fetchCountriesOnce,
  filterTypeList,
  topList,
  years,
} from "../../utils/constant";

const cx = classNames.bind(styles);
const { Option } = Select;

export default function FilterOptions({
  yearMode = "single", // "single" hoặc "range" hoặc "year"
  selectedYear,
  startYear,
  endYear,
  selectedCountry,
  onYearChange,
  onStartYearChange,
  onEndYearChange,
  onCountryChange,
  selectedTop,
  onTopChange,
  selectedType,
  onTypeChange,
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
      {yearMode === "single" || yearMode === "year" ? (
        <div className={cx("option-item")}>
          <label>Năm:</label>
          <Select
            value={selectedYear}
            style={{ width: 120 }}
            onChange={onYearChange}
          >
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
            <Select
              value={startYear}
              style={{ width: 120 }}
              onChange={onStartYearChange}
            >
              {years.map((year) => (
                <Option key={year} value={year}>
                  {year}
                </Option>
              ))}
            </Select>
          </div>
          <div className={cx("option-item")}>
            <label>Năm kết thúc:</label>
            <Select
              value={endYear}
              style={{ width: 120 }}
              onChange={onEndYearChange}
            >
              {years.map((year) => (
                <Option key={year} value={year}>
                  {year}
                </Option>
              ))}
            </Select>
          </div>
        </>
      )}
      {yearMode !== "year" && (
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
      )}

      {selectedTop && (
        <div className={cx("option-item")}>
          <label>Top:</label>
          <Select
            value={selectedTop}
            style={{ width: 150 }}
            onChange={onTopChange}
          >
            {topList.map((top) => (
              <Option key={top} value={top}>
                {top}
              </Option>
            ))}
          </Select>
        </div>
      )}

      {selectedType && (
        <div className={cx("option-item")}>
          <label>Loại hình lọc</label>
          <Select
            value={selectedType}
            style={{ width: 150 }}
            onChange={onTypeChange}
          >
            {filterTypeList.map((type) => (
              <Option key={type.key} value={type.key}>
                {type.label}
              </Option>
            ))}
          </Select>
        </div>
      )}
    </div>
  );
}
