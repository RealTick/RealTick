import React, { useState } from 'react';
import styles from './component_css/Input.module.css';

function Input({ symbol, setSymbol, fetchData }) {
  
  const [localSymbol, setLocalSymbol] = useState(symbol);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setSymbol(localSymbol); // update the parent state
    fetchData(localSymbol); // pass the local symbol to the fetchData function
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputContainer}>
        <input
          value={localSymbol}
          onChange={(e) => setLocalSymbol(e.target.value.toUpperCase())}
          onKeyDown={handleKeyDown}
          placeholder="Enter stock symbol... (Stocks, Bonds, ETFS, etc.)"
          className={styles.inputField}
        />
        <button onClick={handleSubmit} className={styles.searchButton}>
          Search
        </button>
      </div>
    </div>
  );
}

export default Input;