import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./component_css/Search.module.css";
import debounce from "lodash.debounce";

import SearchResults from "./SearchResults";

import { IconSearch } from "@tabler/icons-react";

function Search({ symbol, setSymbol, fetchData }) {
  const [localSymbol, setLocalSymbol] = useState(symbol); //initial symbol
  const [results, setResults] = useState([]); // New state for search results
  const [selectedResult, setSelectedResult] = useState(-1); //initial index -1
  const [cache, setCache] = useState({}); // cache for search results

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
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=3XBBB1VNSPCX9YSJ` //better to move to backend
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
    setSelectedResult(index); // selected result becomes new index
  };

  const performSearch = () => {
    setResults([]); // clear results
    setSymbol(localSymbol); // new symbol to fetch
    fetchData(localSymbol); // fetch new symbol
    setSelectedResult(-1); // clear selectedResult
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
          placeholder="Enter stock symbol... (Stocks, Bonds, ETFS, etc.)"
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

export default Search;
