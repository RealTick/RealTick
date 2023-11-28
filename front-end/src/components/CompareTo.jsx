import React, { useState, useEffect, useCallback } from "react";
import styles from "./component_css/CompareTo.module.css";
import debounce from "lodash.debounce";

import fetchCompareToData from "./StockCompareTo";

import SearchResults from "./CompareToResults";
import { IconSearch } from "@tabler/icons-react";

function CompareTo({ symbol }) {
  const [localSymbol, setLocalSymbol] = useState("");
  const [searchedSymbols, setSearchedSymbols] = useState(
    symbol ? [symbol] : []
  );
  const [results, setResults] = useState([]); // Stores search results
  const [selectedResult, setSelectedResult] = useState(-1); // Index of the selected result
  const [cache, setCache] = useState({}); // Cache for search results

  const MIN_INPUT_LENGTH = 2;
  const MAX_INPUT_LENGTH = 5;

  // Debounced search function
  const debouncedFetchSymbols = useCallback(
    debounce((query) => {
      if (cache[query]) {
        setResults(cache[query]);
      } else {
        fetchSymbols(query);
      }
    }, 100),
    [cache]
  );

  // Fetch symbols from API
  const fetchSymbols = async (query) => {
    console.log("Fetching Results for: ", query);
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=3XBBB1VNSPCX9YSJ` //better to move to backend
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const matches = data.bestMatches || [];

      const filteredMatches = matches.filter(
        (match) => match["4. region"] === "United States"
        // && match["3. type"] !== "Mutual Fund"
      );

      setCache((prevCache) => ({
        ...prevCache,
        [query]: filteredMatches.slice(0, 6),
      }));
      setResults(filteredMatches.slice(0, 6));
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const newSymbol = e.target.value.toUpperCase();
    setLocalSymbol(newSymbol);
    if (
      newSymbol.length >= MIN_INPUT_LENGTH &&
      newSymbol.length <= MAX_INPUT_LENGTH
    ) {
      debouncedFetchSymbols(newSymbol);
    } else {
      setResults([]);
    }
  };

  // Add the selected symbol to the list and fetch data
  const performSearch = () => {
    setResults([]);
    if (!searchedSymbols.includes(localSymbol)) {
      setSearchedSymbols((prevSymbols) => [...prevSymbols, localSymbol]);
      fetchDataForMultipleSymbols([...searchedSymbols, localSymbol]);
    }
    setSelectedResult(-1);
  };

  // Clear searched symbols array
  const clearSearchedSymbols = () => {
    setSearchedSymbols([]);
  };

  // Fetch data for symbols
  const fetchDataForMultipleSymbols = async (symbols) => {
    const fetchData = async (symbol) => {
      try {
        const response = await fetchCompareToData(symbol);
        if (!response.ok) {
          throw new Error(`Network response was not ok for symbol: ${symbol}`);
        }
        return await response.json();
      } catch (error) {
        console.error("Error fetching data for symbol:", symbol, error);
        return null;
      }
    };

    // Create an array of promises for each symbol
    const promises = symbols.map((symbol) => fetchData(symbol));

    // Use Promise.allSettled to wait for all promises to settle (resolve or reject)
    const results = await Promise.allSettled(promises);

    // Combine symbols with their respective data
    const symbolData = {};
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        symbolData[symbols[index]] = result.value;
      } else {
        symbolData[symbols[index]] = null;
      }
    });

    console.log(symbolData); // This is your symbol-to-data mapping
    // Now you can use symbolData as needed
  };

  // Cleanup function for debounce
  useEffect(() => {
    return () => debouncedFetchSymbols.cancel();
  }, [debouncedFetchSymbols]);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputContainer}>
        <input
          value={localSymbol}
          onChange={handleInputChange}
          placeholder="Enter stock to compare..."
          className={styles.inputField}
        />
        <button onClick={performSearch} className={styles.searchButton}>
          <IconSearch />
        </button>
      </div>
      {results.length > 0 && (
        <SearchResults
          results={results}
          selectedResult={selectedResult}
          onResultHover={(index) => {
            setLocalSymbol(results[index]["1. symbol"]);
            setSelectedResult(index);
          }}
          onResultClick={(symbol) => {
            setLocalSymbol(symbol);
            performSearch();
          }}
        />
      )}
      <button onClick={clearSearchedSymbols} className={styles.clearButton}>
        Clear Stocks
      </button>
    </div>
  );
}

export default CompareTo;
