import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

import fetchData from './components/StockService';
import StockInfo from './components/StockInfo';
import ErrorMessage from './components/errorMessage'; 
import Input from './components/Input';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeLoader from '../public/themes/ThemeLoader';
import LineChart from './components/LineChart';
import NewsModule from './components/NewsModule';

function App() {
  const [inputSymbol, setInputSymbol] = useState(''); 
  const [displayedSymbol, setDisplayedSymbol] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchData = async () => {
    try {
      const response = await fetchData(inputSymbol);

      if (response) {
        setData(response);
        setError(null);
        setDisplayedSymbol(inputSymbol);  // Update displayedSymbol only upon successful fetching
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
  
  <div className='searchContainer'>
    <div className='searchBox'>
      <Input 
        symbol={inputSymbol} 
        setSymbol={setInputSymbol} 
        fetchData={handleFetchData} 
      />
    </div>
  </div>
  
  <div className="contentContainer">
    <div className='stockDataContainer'>
      <div className='stockData'>
        {data && <StockInfo symbol={displayedSymbol} data={data} />}
      </div>
      <ErrorMessage error={error} />
    </div>
    
    
  </div>

    { <div className='lineChartContainer'>
      <div className='LineChart'>
        <LineChart chartData={data?.chart}/>
      </div>
      </div> }

  <div className='stockDataContainer'>
    <div className='newsModule'>
      <NewsModule data={data?.news} />
    </div>
  </div>
  
</div>

    </ThemeProvider>
  );
}

export default App;