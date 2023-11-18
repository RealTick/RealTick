import React, { useState } from "react";
import styles from "./component_css/Input.module.css";

function Input({ symbol, setSymbol, fetchData }) {
  const [localSymbol, setLocalSymbol] = useState(symbol);
  const [results, setResults] = useState([]); // New state for search results
  const [selectedResult, setSelectedResult] = useState(-1); //initial index -1

  const MIN_INPUT_LENGTH = 2; // minimum number of characters before making an API request

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (results.length > 0) {
      if (e.key === "ArrowUp") {
        setSelectedResult(
          (prevIndex) => Math.max(prevIndex - 1, 0) //stop at 0
        );
      } else if (e.key === "ArrowDown") {
        setSelectedResult(
          (prevIndex) => Math.min(prevIndex + 1, results.length - 1) //stop at results.length - 1
        );
      }
    }
  };

  const searchSymbols = async (query) => {
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=Y8LETOLT99NRN9CG`
      );

      if (!response.ok) {
        //network issue maybe?
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResults(data.bestMatches || []);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleInputChange = (value) => {
    setLocalSymbol(value);
    if (value.length >= MIN_INPUT_LENGTH) {
      // Check the input length before making a search
      searchSymbols(value);
    } else {
      setResults([]); // Clear the results if input is below the minimum length
    }
  };

  const handleSubmit = () => {
    if (selectedResult >= 0 && selectedResult < results.length - 1) {
      //use selected item
      setLocalSymbol(results[selectedResult]["1. symbol"]);
    }
    setResults([]);
    setSymbol(localSymbol);
    fetchData(localSymbol);
    setSelectedResult(-1);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputContainer}>
        <input
          value={localSymbol}
          onChange={(e) => handleInputChange(e.target.value.toUpperCase())}
          onKeyDown={handleKeyDown}
          placeholder="Enter stock symbol... (Stocks, Bonds, ETFS, etc.)"
          className={styles.inputField}
        />
        <button onClick={handleSubmit} className={styles.searchButton}>
          Search
        </button>
        {/* Display search results */}
        {results.length > 0 && (
          <div className={styles.resultsContainer}>
            {results.map((result, index) => (
              <div
                key={result["1. symbol"]}
                onClick={() => {
                  setLocalSymbol(result["1. symbol"]);
                  setResults([]); // Clear the results after selection
                  handleSubmit();
                }}
                className={`${styles.resultItem} ${
                  index === selectedResult ? styles.selectedItem : "" // selected item highlighted
                }`}
              >
                {result["1. symbol"]} - {result["2. name"]}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;
