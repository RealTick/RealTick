import React, { useState, useEffect, useCallback } from "react";
import styles from "./component_css/CompareTo.module.css";
import debounce from "lodash.debounce";
import fetchCompareToData from './StockCompareTo'; // Adjust the path accordingly

import SearchResults from "./CompareToResults";

import { IconSearch } from "@tabler/icons-react";
import { local } from "d3";


function CompareTo({ symbol }) {
  const [localSymbol, setLocalSymbol] = useState(symbol); //initial symbol
  const [results, setResults] = useState([]); // New state for search results
  const [selectedResult, setSelectedResult] = useState(-1); //initial index -1
  const [cache, setCache] = useState({}); // cache for search results
  console.log("LOCAL: "+localSymbol);
  console.log("NEW: "+symbol);

  const MIN_INPUT_LENGTH = 2; // minimum number of characters before making an API request
  const MAX_INPUT_LENGTH = 5; // minimum number of characters before API requests stop

  // debounce search using lodash
  const debounced_fetchSymbols = useCallback(
    debounce((query) => {
      if (cache[query]) {
        setResults(cache[query]);
      } else {
        fetchSymbols(query);
      }
    }, 100),
    [cache] // include cache to ensure it uses the latest state, not an old one
  );

  const fetchSymbols = async (query) => {
    console.log("Fetching Results for: ", query);
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=3XBBB1VNSPCX9YSJ`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const matches = data.bestMatches || [];

      setCache((prevCache) => ({
        ...prevCache,
        [query]: matches.slice(0, 6), // cache only 6 results
      }));
      setResults(matches.slice(0, 6)); // display 6 results
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
      if (selectedResult - 1 < 0) {
        setSelectedResult(results.length - 1);
        setLocalSymbol(results[results.length - 1]["1. symbol"]);
      } else {
        setSelectedResult(newIndex);
        setLocalSymbol(results[newIndex]["1. symbol"]);
      }
    } else if (e.key === "ArrowDown" && results.length > 0) {
      const newIndex = Math.min(selectedResult + 1, results.length - 1);
      if (selectedResult + 1 > results.length - 1) {
        setSelectedResult(0);
        setLocalSymbol(results[0]["1. symbol"]);
      } else {
        setSelectedResult(newIndex);
        setLocalSymbol(results[newIndex]["1. symbol"]);
      }
    }
  };

  const handleResultHover = (index) => {
    setLocalSymbol(results[index]["1. symbol"]);
    setSelectedResult(index); // selected result becomes new index
  };

  const performSearch = () => {
    setResults([]); // clear results
    setSelectedResult(-1); // clear selectedResult
  
    const trimmedSymbol = localSymbol.replace(/^['"]|['"]$/g, '');
    
    // First fetch for trimmedSymbol
    fetchCompareToData(trimmedSymbol)
      .then((data) => {
        console.log("Data for trimmed symbol: "+trimmedSymbol, data);
        // Delay the second fetch by 1 millisecond
        setTimeout(() => {
          fetchCompareToData(symbol) // fetch OLD symbol
            .then((oldData) => {
              console.log("Data for old symbol: "+symbol, oldData);
              // Handle the data as needed
            })
            .catch((error) => {
              console.error("Error fetching data for old symbol:", error);
            });
        }, 1);
      })
      .catch((error) => {
        console.error("Error fetching data for trimmed symbol:", error);
      });
  };
  

  // cleanup debounce
  useEffect(() => {
    return () => debounced_fetchSymbols.cancel();
  }, [debounced_fetchSymbols]);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputContainer}>
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
