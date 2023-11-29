import React, { useState, useEffect } from 'react';
import CompareTo from './CompareTo';
import CompareChart from './CompareChart'; // Import the CompareChart
import fetchCompareToData from './StockCompareTo'; // Adjust the path accordingly

function ParentComponent({ initialSymbol }) {
  const [fetchedData, setFetchedData] = useState({});

  const handleDataFetched = (newData) => {
    setFetchedData(prevData => ({ ...prevData, ...newData }));
  };

  // Fetch data for the initial symbol on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCompareToData(initialSymbol);
        handleDataFetched({ [initialSymbol]: data });
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    if (initialSymbol) {
      fetchData();
    }
  }, [initialSymbol]); // Dependency array includes initialSymbol

  return (
    <div>
      <CompareTo symbol={initialSymbol} onDataFetched={handleDataFetched} />
      {fetchedData && <CompareChart chartData={fetchedData} />}
    </div>
  );
}

export default ParentComponent;
