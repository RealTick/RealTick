import React from 'react';

const StockInfo = ({ symbol, data }) => {
  return (
    <div>
      <h2>{symbol}</h2>
      <p>Current Price: {data.current_price}</p>
      <p>Market Cap: {data.market_cap}</p>
      {/* Display the chart data (You can integrate Chart.js for better visualization later) */}
    </div>
  );
};

export default StockInfo;