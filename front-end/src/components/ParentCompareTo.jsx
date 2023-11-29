import React, { useState } from 'react';
import CompareTo from './CompareTo';
import CompareChart from './CompareChart'; // Import the CompareChart

function ParentComponent() {
  const [fetchedData, setFetchedData] = useState({});

  const handleDataFetched = (newData) => {
    setFetchedData(prevData => ({ ...prevData, ...newData }));
  };

  return (
    <div>
      <CompareTo symbol="InitialSymbol" onDataFetched={handleDataFetched} />
      <CompareChart chartData={fetchedData} />
    </div>
  );
}


export default ParentComponent;
