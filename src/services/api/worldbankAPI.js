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
        value: value !== undefined && value !== null ? value.toLocaleString("en-US") : "N/A",
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
