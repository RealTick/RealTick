import React, { useState, useEffect } from "react"; // Added useEffect
import axios from "axios";
import "./App.css";

import fetchData from "./components/StockService";
import StockInfo from "./components/StockInfo";
import ErrorMessage from "./components/errorMessage";
import Input from "./components/Input";
import { ThemeProvider } from "./contexts/ThemeContext";
import ThemeLoader from "../public/themes/ThemeLoader";
import LineChart from "./components/LineChart";
import NewsModule from "./components/NewsModule";
import { Line } from "react-chartjs-2";

// oct 18
// import CandlestickChart from "./components/CandlestickChart";

import PeriodSelector from "./components/PeriodSelector"; // Adjust path if needed

const trimDataByPeriod = (data, period) => {
  if (!data || typeof data !== "object") return null;

  const currentDate = new Date();
  let startDate;

  switch (period) {
    case "1d":
      startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - 1);
      break;
    case "5d":
      startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - 5);
      break;
    case "1m":
      startDate = new Date(currentDate);
      startDate.setMonth(currentDate.getMonth() - 1);
      break;
    case "6m":
      startDate = new Date(currentDate);
      startDate.setMonth(currentDate.getMonth() - 6);
      break;
    case "1y":
      startDate = new Date(currentDate);
      startDate.setFullYear(currentDate.getFullYear() - 1);
      break;
    case "max":
    default:
      return data;
  }

  return Object.keys(data).reduce((acc, dateStr) => {
    const date = new Date(dateStr);
    if (date >= startDate) {
      acc[dateStr] = data[dateStr];
    }
    return acc;
  }, {});
};

function App() {
  const [inputSymbol, setInputSymbol] = useState("");
  const [displayedSymbol, setDisplayedSymbol] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("1y"); // Default to 1 year

  const handleFetchData = async (period = selectedPeriod) => {
    try {
      const response = await fetchData(inputSymbol, period);
      console.log("Raw Response:", response);

      if (response && response.chart) {
        const trimmedChartData = trimDataByPeriod(response.chart, period);
        console.log("Trimmed Chart Data:", response);
        setData({ ...response, chart: trimmedChartData });
        setError(null);
        setDisplayedSymbol(inputSymbol); // Update displayedSymbol only upon successful fetching
      } else {
        setError("Received unexpected data format.");
      }
    } catch (err) {
      setError(`Error fetching data: ${err.message || "Please try again."}`);
      setData(null);
    }
  };

  useEffect(() => {
    // Fetch stock data right away and then set up an interval to fetch every minute.
    const fetchStockData = () => {
      handleFetchData();
    };

    // Call the fetch function immediately
    fetchStockData();

    // Set up the interval
    const intervalId = setInterval(fetchStockData, 60000); // 60000ms = 1 minute

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [inputSymbol, selectedPeriod]); // Dependency array. Refetches when inputSymbol changes.

  return (
    <ThemeProvider>
      <ThemeLoader />

      <div className="App">
        <div className="searchContainer">
          <div className="searchBox">
            <Input
              symbol={inputSymbol}
              setSymbol={setInputSymbol}
              fetchData={handleFetchData}
            />
          </div>
        </div>

        <div className="contentContainer">
          <div className="stockDataContainer">
            <div className="stockData">
              {data && <StockInfo symbol={displayedSymbol} data={data} />}
            </div>
            <ErrorMessage error={error} />
          </div>
        </div>

        {/* <LineChart chartData={data?.chart_data}/> */}

        <div className="lineChartContainer">
          <div className="LineChart">
            <LineChart chartData={data?.chart} />
          </div>
        </div>

        <PeriodSelector
          selectedPeriod={selectedPeriod}
          onSelectPeriod={(period) => {
            setSelectedPeriod(period);
            handleFetchData(period); // Fetch data immediately for the new period
          }}
        />

        <div className="stockDataContainer">
          <div className="newsModule">
            <NewsModule data={data?.news} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
