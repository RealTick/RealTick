//import React, { useState } from 'react';
import React, { useState, useEffect } from "react"; // Added useEffect SA
import axios from "axios";
import "./App.css";

import fetchData from "./components/StockService";
import fetchRealTimeData from "./components/StockRealTimeService"; //REAL TIME DATA
import StockInfo from "./components/StockInfo";
import ErrorMessage from "./components/ErrorMessage";
import Search from "./components/Search";
import { ThemeProvider } from "./contexts/ThemeContext";
import ThemeLoader from "../public/themes/ThemeLoader";
import NewsModule from "./components/NewsModule";
import Logo from "./components/Logo";
import Reccomender from "./components/Reccomender";
import Watchlist from "./components/Watchlist";
import Trending from "./components/Trending";
import "./components/component_css/bodyWrapper.css";
import "./components/component_css/headerWrapper.css";
import ChartContainer from "./components/ChartContainer";
import Settings from "./components/Settings";
import CompareTo from "./components/CompareTo";

function App() {
  const [inputSymbol, setInputSymbol] = useState("");
  const [displayedSymbol, setDisplayedSymbol] = useState("");
  const [data, setData] = useState(null);

  const [error, setError] = useState(null);
  const [query, setQuery] = useState(false);

  const handleFetchData = async (symbolToFetch) => {
    try {
      const response = await fetchData(symbolToFetch);

      if (response) {
        setData(response);
        setError(null);
        setDisplayedSymbol(symbolToFetch); // set it to the symbolToFetch instead of inputSymbol
        setQuery(true);
      } else {
        setError("Received unexpected data format.");
      }
    } catch (err) {
      setError(`Error fetching data: ${err.message || "Please try again."}`);
      setData(null);
    }
  };

  // const handleFetchRealTimeData = async (symbolToFetch) => {
  //   try {
  //     const response = await fetchRealTimeData(symbolToFetch);
  //     if (response) {
  //       // Process and store the real-time data
  //       // For example, you might want to update a different state variable
  //       console.log("Fetched Realtime data for " + symbolToFetch);
  //       setRealTimeData(response);
  //     } else {
  //       setError("Received unexpected real-time data format.");
  //     }
  //   } catch (err) {
  //     setError(
  //       `Error fetching real-time data: ${err.message || "Please try again."}`
  //     );
  //   }
  // };

  // useEffect(() => {
  //   if (displayedSymbol) {
  //     handleFetchRealTimeData(displayedSymbol);
  //   }
  // }, [displayedSymbol]);

  const handleErrorClose = () => {
    setError(null); // resets error state so error can be shown again
  };

  const resetComponents = () => {
    setData(null);
    setError(null);
    setInputSymbol("");
    setDisplayedSymbol("");
    setQuery(false);
  };

  // // REFRESH_TICKER SA
  // useEffect(() => {
  //   // Fetch stock data right away and then set up an interval to fetch every minute.
  //   const fetchStockData = () => {
  //     handleFetchData();
  //   };

  //   // Call the fetch function immediately
  //   //fetchStockData();

  //   // Set up the interval
  //   const intervalId = setInterval(fetchStockData, 60000); // 60000ms = 1 minute

  //   // Clear the interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, [inputSymbol]); // Dependency array. Refetches when inputSymbol changes.
  // // REFRESH_TICKER SA

  return (
    <ThemeProvider>
      <ThemeLoader />
      <div className="App">
        {/* Header */}
        <div className="Header">
          <div className="headerWrapper">
            <div className="leftComponent">
              <div className="logoContainer">
                <Logo onReset={resetComponents} />
              </div>
            </div>
            <div className="middleComponent">
              <Search
                symbol={inputSymbol}
                setSymbol={setInputSymbol}
                fetchData={handleFetchData}
              />
            </div>
            <div className="rightComponent">
              <Settings></Settings>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="Body">
          <div className="bodyWrapper">
            <div className="watchlistContainer">
              {data && (
                <Watchlist
                  handleFetchData={handleFetchData}
                  displayedSymbol={displayedSymbol}
                />
              )}
            </div>

            <div className="stockDataContainer">
              {data && <StockInfo symbol={displayedSymbol} data={data} />}
              <ErrorMessage error={error} onModalClose={handleErrorClose} />
            </div>

            {query && (
              <div className="ChartContainer">
                <ChartContainer
                  chartData={data?.chart}
                  symbol={displayedSymbol}
                />
              </div>
            )}
            <div className="verticalWrapper">
              <div className="reccomenderContainer">
                {data && (
                  <Reccomender
                    similarStocks={data.similar_stocks}
                    handleFetchData={handleFetchData}
                  />
                )}
              </div>

              <div className="trendingContainer">
                {data && (
                  <Trending
                    trendingStocks={data.trending_stocks}
                    handleFetchData={handleFetchData}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="newsContainer">
            <NewsModule data={data?.news} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
