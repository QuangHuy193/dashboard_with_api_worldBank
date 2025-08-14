import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { fetchWorldBank3 } from "../../../services/api/worldbankAPI";
import { geoUrl } from "../../../utils/constant";


const WorldMap = ({ year = 2020, indicatorCode = "SP.POP.TOTL" }) => {
  const [data, setData] = useState([]);
  const [tooltip, setTooltip] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(geoUrl);
      const worldData = await res.json();
      const countries = worldData.objects.countries.geometries.map(c => ({
        id: c.id,
        name: c.properties?.name || "",
        iso_a3: c.properties?.iso_a3 || ""
      }));

      const enriched = await Promise.all(
        countries.map(async (country) => {
          const value = await fetchWorldBank3(country.iso_a3, indicatorCode, year);
          return { ...country, value };
        })
      );

      setData(enriched);
    }
    fetchData();
  }, [year, indicatorCode]);

  const colorScale = scaleLinear()
    .domain([0, Math.max(...data.map(d => (d.value !== "N/A" ? d.value : 0)))])
    .range(["#f0f0f0", "#ff8c00"]);

  return (
    <div>
      <ComposableMap projectionConfig={{ scale: 140 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryData = data.find(d => d.iso_a3 === geo.properties.ISO_A3);
              const value = countryData?.value;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    setTooltip(`${geo.properties.NAME}: ${value === "N/A" ? "Không có dữ liệu" : value.toLocaleString()}`);
                  }}
                  onMouseLeave={() => {
                    setTooltip("");
                  }}
                  style={{
                    default: {
                      fill: value === "N/A" ? "#EEE" : colorScale(value),
                      outline: "none"
                    },
                    hover: {
                      fill: "#ff8c00",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      {tooltip && (
        <div style={{ padding: "8px", background: "#fff3cd", border: "1px solid #ffeeba", borderRadius: "5px", marginTop: "10px" }}>
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default WorldMap;
