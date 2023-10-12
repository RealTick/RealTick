import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [symbol, setSymbol] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/stock?symbol=${symbol}`);

      if (response.data) {
        setData(response.data);
        setError(null);
      } else {
        setError('Received unexpected data format.');
      }
    } catch (err) {
      setError(`Error fetching data: ${err.message || 'Please try again.'}`);
      setData(null);
    }
  };

  return (
    <div className="App">
      <input
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder="Enter stock symbol..."
      />
      <button onClick={fetchData}>Search</button>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {data && (
        <div>
          <h2>{symbol}</h2>
          <p>Current Price: {data.current_price}</p>
          <p>Market Cap: {data.market_cap}</p>
          {/* Display the chart data (You can integrate Chart.js for better visualization later) */}
        </div>
      )}
    </div>
  );
}

export default App;