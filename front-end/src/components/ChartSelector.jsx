import React, { useState } from "react";
import {
  IconTableOptions,
  IconChartLine,
  IconChartCandle,
  IconChartCandleFilled,
  IconChartArea,
  IconChartSankey,
  IconChartDots3,
  IconTimeline,
  IconTrendingUp,
} from "@tabler/icons-react";
import styles from "./component_css/ChartContainer.module.css";

function ChartSelector({ onChartTypeChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleChartTypeChange = (type) => {
    onChartTypeChange(type);
    setDropdownOpen(false);
  };

  return (
    <div className={styles.chartHeader}>
      <button onClick={toggleDropdown} className={styles.settingsButton}>
        <IconTableOptions size={24} stroke={2} />
      </button>
      <div
        className={`${styles.chartSelectorDropdown} ${
          dropdownOpen ? styles.active : ""
        }`}
      >
        <div
          onClick={() => handleChartTypeChange("line")}
          className={styles.dropdownItem}
        >
          <IconChartLine size={24} stroke={2} /> Line
        </div>
        <div
          onClick={() => handleChartTypeChange("candlestick")}
          className={styles.dropdownItem}
        >
          <IconChartCandle size={24} stroke={2} /> Candlestick
        </div>
        <div
          onClick={() => handleChartTypeChange("ohlc")}
          className={styles.dropdownItem}
        >
          <IconChartCandleFilled size={24} stroke={2} /> OHLC
        </div>
        {/* <div
          onClick={() => handleChartTypeChange("area")}
          className={styles.dropdownItem}
        >
          <IconChartArea size={24} stroke={2} /> Area
        </div> */}
        <div
          onClick={() => handleChartTypeChange("ichimoku")}
          className={styles.dropdownItem}
        >
          <IconTrendingUp size={24} stroke={2} /> Ichimoku
        </div>


        <div
          onClick={() => handleChartTypeChange("realtime")}
          className={styles.dropdownItem}
        >
          <IconTimeline size={24} stroke={2} /> Realtime
        </div>
        <div
          onClick={() => handleChartTypeChange("advancedline")}
          className={styles.dropdownItem}
        >
          <IconChartDots3 size={24} stroke={2} /> Advanced
        </div>
        <div
          onClick={() => handleChartTypeChange("comparetochart")}
          className={styles.dropdownItem}
        >
          <IconChartSankey size={24} stroke={2} /> Compare
        </div>
      </div>
    </div>
  );
}

export default ChartSelector;
