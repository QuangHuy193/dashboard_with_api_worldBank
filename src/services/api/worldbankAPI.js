import { validCountryISO3Codes } from "../../utils/constant";

export const fetchWorldBankData = async (
  countryCode = "WLD",
  indicatorCode,
  year = "2025"
) => {
  try {
    const res = await fetch(
      `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicatorCode}?date=${year}&format=json`
    );
    const data = await res.json();
    const latest = data[1]?.[0]?.value || "N/A";

    return latest !== "N/A" ? latest.toLocaleString("en-US") : "N/A";
  } catch (error) {
    console.error("Error fetching World Bank data:", error);
    return "N/A";
  }
};

export const fetchWorldBankDataRange = async (
  countryCode = "WLD",
  indicatorCode,
  startYear = "1960",
  endYear = "2025"
) => {
  const results = [];

  for (let year = parseInt(startYear); year <= parseInt(endYear); year++) {
    try {
      const res = await fetch(
        `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicatorCode}?date=${year}&format=json`
      );
      const data = await res.json();
      const value = data[1]?.[0]?.value;

      results.push({
        year,
        value:
          value !== undefined && value !== null
            ? value.toLocaleString("en-US")
            : "N/A",
      });
    } catch (error) {
      console.error(`Error fetching data for ${year}:`, error);
      results.push({ year, value: "N/A" });
    }
  }

  return results;
};

//lấy mã và tên quốc gia
export async function fetchAllCountries() {
  const res = await fetch(
    "https://api.worldbank.org/v2/country?format=json&per_page=300"
  );
  const json = await res.json();
  return json[1].map((c) => ({
    code: c.id,
    iso2: c.iso2Code,
    name: c.name,
  }));
}

//
export const fetchWorldBankDataTop = async (
  indicatorCode,
  year = "2025",
  type,
  number = 10
) => {
  try {
    const url = `https://api.worldbank.org/v2/country/all/indicator/${indicatorCode}?date=${year}&format=json&per_page=10000`;

    const res = await fetch(url);
    const data = await res.json();

    // Kiểm tra dữ liệu hợp lệ
    if (!data[1]) {
      return [];
    }

    // Lọc quốc gia có dữ liệu và loại bỏ các vùng/khu vực đặc biệt
    const validData = data[1].filter((item) => {
      return (
        item.value !== null &&
        item.value !== undefined &&
        item.countryiso3code &&
        item.countryiso3code !== "" &&
        validCountryISO3Codes.has(item.countryiso3code)
      );
    });

    // Sắp xếp giảm dần theo value
    let sortedData = [...validData];
    if (type === "top") {
      sortedData = validData.sort((a, b) => b.value - a.value);
    } else {
      sortedData = validData.sort((a, b) => a.value - b.value);
    }

    // Trả về top N
    return sortedData.slice(0, number).map((item) => ({
      country: item.country.value,
      code: item.country.id,
      value: item.value,
      year: item.date,
    }));
  } catch (error) {
    console.error("Error fetching World Bank data:", error);
    return [];
  }
};
