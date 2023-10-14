// Input.js
import React from 'react';
import styles from './component_css/Input.module.css';

function Input({ symbol, setSymbol, fetchData }) {
  return (
    <div className={styles.inputContainer}>
      <input
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder="Enter stock symbol..."
        className={styles.inputField}
      />
      <button onClick={fetchData} className={styles.searchButton}>Search</button>
    </div>
  );
}

export default Input;