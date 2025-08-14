export const fetchWorldBankData = async (countryCode, indicatorCode, year) => {
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

//lấy mã và tên quốc gia
export async function fetchAllCountries() {
  const res = await fetch(
    "https://api.worldbank.org/v2/country?format=json&per_page=300"
  );
  const json = await res.json();
  return json[1].map(c => ({
    code: c.id,
    iso2: c.iso2Code,
    name: c.name,
  }));
}
