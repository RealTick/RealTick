import React from 'react';
import LineChart from './LineChart';

function StockInfo({ symbol, data }) {
  return (
    <div className="stock-info">
        <div className="header-info">
            <h2>{symbol}</h2>
            <p><strong>Current Price:</strong> ${data.current_price.toFixed(2)}</p>
        </div>
        
        <div className="details">
            <div className="detail-item">
                <p><strong>Opening Price:</strong> ${data.opening_price.toFixed(2)}</p>
                <p><strong>Yearly Return:</strong> {data.yearly_return.toFixed(2)}%</p>
            </div>
            
            <div className="detail-item">
                <p><strong>YTD Return:</strong> {data.ytd_return.toFixed(2)}%</p>
                <p><strong>Market Cap:</strong> ${data.market_cap.toLocaleString()}</p>
            </div>
        </div>
    </div>

  );
}

const periodMapping = {
  '1mo': '1 Month',
  '3mo': '3 Months',
  '6mo': '6 Months',
  '1y': '1 Year',
};

export default StockInfo;