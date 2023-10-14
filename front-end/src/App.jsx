import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import StockInfo from './components/stockInfo';
import ErrorMessage from './components/errorMessage'; 

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

      <ErrorMessage error={error} />

      {data && <StockInfo symbol={symbol} data={data} />}
    </div>
  );
}

export default App;