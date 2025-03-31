import React, { useState } from "react";
import * as d3 from "d3";

const Heatmap = () => {
  const data = [
    { hospital: "Hospital 1", leadership: 61, management: 64, delivery: 79, relationship: 64, overall: 67 },
    { hospital: "Hospital 2", leadership: 73, management: 65, delivery: 67, relationship: 61, overall: 66 },
    { hospital: "Hospital 3", leadership: 55, management: 56, delivery: 45, relationship: 36, overall: 48 },
    { hospital: "Hospital 4", leadership: 57, management: 59, delivery: 58, relationship: 53, overall: 57 },
    { hospital: "Hospital 5", leadership: 65, management: 63, delivery: 68, relationship: 55, overall: 60 },
    { hospital: "Hospital 6", leadership: 59, management: 65, delivery: 55, relationship: 73, overall: 63 },
    { hospital: "Hospital 7", leadership: 48, management: 46, delivery: 53, relationship: 41, overall: 47 },
    { hospital: "Hospital 8", leadership: 77, management: 87, delivery: 76, relationship: 79, overall: 80 },
    { hospital: "Hospital 9", leadership: 70, management: 80, delivery: 90, relationship: 82, overall: 80 },
    { hospital: "Hospital 10", leadership: 82, management: 79, delivery: 68, relationship: 63, overall: 73 },
  ];

  const categories = ["leadership", "management", "delivery", "relationship", "overall"];

  // Color scale based on performance percentage
  const colorScale = d3
    .scaleThreshold()
    .domain([40, 50, 60, 70, 80, 90])
    .range(["#ff4d4d", "#ff9933", "#ffcc00", "#ffff66", "#99cc66", "#33cc33", "#009900"]);

  const [tooltip, setTooltip] = useState({ visible: false, value: "", x: 0, y: 0, color: "" });

  return (
    <div style={{ padding: "20px", textAlign: "center", position: "relative" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", maxWidth: "800px", margin: "auto" }}>
        <thead>
          <tr>
            <th style={styles.header}>Hospital</th>
            {categories.map((category) => (
              <th key={category} style={styles.header}>{category.charAt(0).toUpperCase() + category.slice(1)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td style={styles.cell}>{row.hospital}</td>
              {categories.map((category) => (
                <td
                  key={category}
                  style={{
                    ...styles.cell,
                    backgroundColor: colorScale(row[category]),
                    color: row[category] < 50 ? "#fff" : "#000",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    const cellRect = e.target.getBoundingClientRect();
                    setTooltip({
                      visible: true,
                      value: `${row[category]}%`,
                      x: cellRect.left + cellRect.width / 2,
                      y: cellRect.top - 30,
                      color: colorScale(row[category]),
                    });
                  }}
                  onMouseMove={(e) => {
                    const cellRect = e.target.getBoundingClientRect();
                    setTooltip((prev) => ({
                      ...prev,
                      x: cellRect.left + cellRect.width / 2,
                      y: cellRect.top - 30,
                    }));
                  }}
                  onMouseLeave={() => setTooltip({ visible: false, value: "", x: 0, y: 0, color: "" })}
                >
                  {row[category]}%
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          style={{
            position: "fixed",
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
            background: "rgba(0,0,0,0.8)",
            color: "#fff",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "14px",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: tooltip.color,
              borderRadius: "3px",
            }}
          ></div>
          {tooltip.value}
        </div>
      )}
    </div>
  );
};

const styles = {
  header: {
    padding: "10px",
    backgroundColor: "#ddd",
    border: "1px solid #ccc",
    textTransform: "capitalize",
  },
  cell: {
    padding: "10px",
    border: "1px solid #ccc",
    textAlign: "center",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Heatmap;
