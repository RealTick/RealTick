import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

import fetchData from './components/StockService';
import StockInfo from './components/stockInfo';
import ErrorMessage from './components/errorMessage'; 
import Input from './components/Input';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeLoader from '../public/themes/ThemeLoader';


function App() {
  const [symbol, setSymbol] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchData = async () => {
    try {
      const response = await fetchData(symbol);

      if (response) {
        setData(response);
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
    <ThemeProvider>
      <ThemeLoader />
     
      <div className="App">
        <Input symbol={symbol} setSymbol={setSymbol} fetchData={handleFetchData} />
        <ErrorMessage error={error} />
        {data && <StockInfo symbol={symbol} data={data} />}
      </div>


    </ThemeProvider>
  );
}

export default App;