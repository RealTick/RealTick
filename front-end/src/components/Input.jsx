import React from 'react';

function Input({ symbol, setSymbol, fetchData }) {
  return (
    <div>
      <input
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder="Enter stock symbol..."
      />
      <button onClick={fetchData}>Search</button>
    </div>
  );
}

export default Input;