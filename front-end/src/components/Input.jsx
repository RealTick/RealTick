// Input.js
import React from 'react';
import styles from './component_css/Input.module.css';

function Input({ symbol, setSymbol, fetchData }) {
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputContainer}>
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          onKeyDown={handleKeyDown}
          placeholder="Enter stock symbol... (Stocks, Bonds, ETFS, etc.)"
          className={styles.inputField}
        />
        <button onClick={fetchData} className={styles.searchButton}>Search</button>
      </div>
    </div>
  );
}

export default Input;