import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

import fetchData from './components/StockService';
import StockInfo from './components/StockInfo';
import ErrorMessage from './components/errorMessage'; 
import Input from './components/Input';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeLoader from '../public/themes/ThemeLoader';
import CandlestickChart from './components/CandlestickChart';
import NewsModule from './components/NewsModule';
import Logo from './components/Logo';
import './components/component_css/bodyWrapper.css'
import './components/component_css/headerWrapper.css'

function App() {
  const [inputSymbol, setInputSymbol] = useState(''); 
  const [displayedSymbol, setDisplayedSymbol] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(false);

  const handleFetchData = async () => {
    try {
      const response = await fetchData(inputSymbol);

      if (response) {
        setData(response);
        setError(null);
        setDisplayedSymbol(inputSymbol);
        setQuery(true);
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
        {/* Header */}
        <div className = "Header">
          <div className = "headerWrapper">
            <div className='logoContainer'>
              <Logo /> 
            </div>

            <div className='searchContainer'>
              <Input 
                symbol={inputSymbol} 
                setSymbol={setInputSymbol} 
                fetchData={handleFetchData} 
              />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="Body">
          <div className="bodyWrapper">
            <div className='stockDataContainer'>
              {data && <StockInfo symbol={displayedSymbol} data={data} />}
              <ErrorMessage error={error} />
            </div>

            {query && 
              <div className='candlestickChartContainer'>
                <CandlestickChart chartData={data?.chart} />
              </div>
            }
          </div>

          {/* Footer */}
          <div className='newsContainer'>
            <NewsModule data={data?.news} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;