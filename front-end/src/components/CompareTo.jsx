import React, { useState, useEffect, useCallback } from "react";
import styles from "./component_css/CompareTo.module.css";
import debounce from "lodash.debounce";
import fetchCompareToData from "./StockCompareTo"; // Adjust the path accordingly
import SearchResults from "./CompareToResults";
import { IconSearch, IconX } from "@tabler/icons-react";

function CompareTo({ symbol, onDataFetched }) {
  const [localSymbol, setLocalSymbol] = useState(); // Initial symbol
  const [results, setResults] = useState([]); // State for search results
  const [selectedResult, setSelectedResult] = useState(-1); // Initial index -1
  const [cache, setCache] = useState({}); // Cache for search results
  const [fetchedData, setFetchedData] = useState({}); // Store data for multiple stocks

  const MIN_INPUT_LENGTH = 2; // Minimum characters before making an API request
  const MAX_INPUT_LENGTH = 5; // Maximum characters before API requests stop

  const debounced_fetchSymbols = useCallback(
    debounce((query) => {
      if (cache[query]) {
        setResults(cache[query]);
      } else {
        fetchSymbols(query);
      }
    }, 100),
    [cache]
  );

  useEffect(() => {
    const performInitialSearch = async () => {
      if (symbol && !fetchedData[symbol]) {
        try {
          const data = await fetchCompareToData(symbol);
          const newFetchedData = { ...fetchedData, [symbol]: data };
          setFetchedData(newFetchedData);
          onDataFetched(newFetchedData);
        } catch (error) {
          console.error("Error fetching initial data for symbol:", error);
        }
      }
    };

    performInitialSearch();
  }, [symbol, onDataFetched, fetchedData]);

  const fetchSymbols = async (query) => {
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=3XBBB1VNSPCX9YSJ`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const matches = data.bestMatches || [];
      const filteredMatches = matches.filter(
        (match) =>
          match["4. region"] === "United States" &&
          match["3. type"] !== "Mutual Fund" &&
          match["3. type"] !== "ETF"
      );

      setCache((prevCache) => ({
        ...prevCache,
        [query]: filteredMatches.slice(0, 6), // Cache only 6 results
      }));
      setResults(filteredMatches.slice(0, 6)); // Display 6 results
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleInputChange = (e) => {
    const newSymbol = e.target.value.toUpperCase();
    setLocalSymbol(newSymbol);
    if (
      newSymbol.length >= MIN_INPUT_LENGTH &&
      newSymbol.length <= MAX_INPUT_LENGTH
    ) {
      debounced_fetchSymbols(newSymbol);
    } else {
      setResults([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      performSearch();
    } else if (e.key === "ArrowUp" && results.length > 0) {
      const newIndex = Math.max(selectedResult - 1, 0);
      setSelectedResult(newIndex);
      setLocalSymbol(results[newIndex]["1. symbol"]);
    } else if (e.key === "ArrowDown" && results.length > 0) {
      const newIndex = Math.min(selectedResult + 1, results.length - 1);
      setSelectedResult(newIndex);
      setLocalSymbol(results[newIndex]["1. symbol"]);
    }
  };

  const handleResultHover = (index) => {
    setLocalSymbol(results[index]["1. symbol"]);
    setSelectedResult(index);
  };

  const clearSearchedSymbols = () => {
    setResults([]);
    setFetchedData([]);
  };

  const performSearch = async () => {
    setResults([]); // Clear previous search results
    setSelectedResult(-1); // Clear selected result
    setLocalSymbol(""); // Clear previous search results
    const trimmedSymbol = localSymbol.trim().toUpperCase();

    // Check if data for this symbol is already fetched
    if (fetchedData[trimmedSymbol]) {
      return;
    }

    try {
      const data = await fetchCompareToData(trimmedSymbol);
      const newFetchedData = { ...fetchedData, [trimmedSymbol]: data };
      setFetchedData(newFetchedData);

      // Notify the parent component with the updated fetched data
      onDataFetched(newFetchedData);
    } catch (error) {
      console.error("Error fetching data for trimmed symbol:", error);
    }
  };

  useEffect(() => {
    return () => debounced_fetchSymbols.cancel();
  }, [debounced_fetchSymbols]);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputContainer}>
        <button onClick={clearSearchedSymbols} className={styles.clearButton}>
          <IconX />
        </button>
        <input
          value={localSymbol}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter stock to compare..."
          className={styles.inputField}
        />
        <button onClick={performSearch} className={styles.searchButton}>
          <IconSearch />
        </button>
      </div>
      {/* Display search results */}
      {results.length > 0 && (
        <SearchResults
          results={results}
          selectedResult={selectedResult}
          onResultHover={handleResultHover}
          onResultClick={(symbol) => {
            setLocalSymbol(symbol);
            performSearch();
          }}
        />
      )}
    </div>
  );
}

export default CompareTo;
