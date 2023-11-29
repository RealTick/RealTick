import React, { useState } from 'react';
import CompareTo from './CompareTo';
import CompareChart from './CompareChart'; // Import the CompareChart

function ParentComponent() {
  const [fetchedData, setFetchedData] = useState(null);

  const handleDataFetched = (data) => {
    setFetchedData(data);
  };

  return (
    <div>
      <CompareTo symbol="InitialSymbol" onDataFetched={handleDataFetched} />
      {fetchedData && <CompareChart chartData={fetchedData} />}
    </div>
  );
}

export default ParentComponent;
