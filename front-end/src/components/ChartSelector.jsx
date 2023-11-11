import React, { useState } from 'react';
import { IconSettings } from '@tabler/icons-react';
import { IconChartLine } from '@tabler/icons-react';
import { IconChartCandle } from '@tabler/icons-react';


import styles from './component_css/ChartContainer.module.css';

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
        <IconSettings size={24} stroke={2} />        
      </button>
      {dropdownOpen && (
        <ul className={styles.chartSelectorDropdown}>
          <li onClick={() => handleChartTypeChange('line')}><IconChartLine size={24} stroke={2} /> Line</li>
          <li onClick={() => handleChartTypeChange('candlestick')}><IconChartCandle size={24} stroke={2} /> Candlestick</li>
          {/* Add more li elements for other chart types as needed */}
        </ul>
      )}
    </div>
  );
}

export default ChartSelector;
