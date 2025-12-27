// StockService.jsx
import axios from "axios";


const fetchCompareToData = async (symbol) => {  
    try {
      const response = await axios.get(
        `http://127.0.0.1:5001/compare_to?symbol=${symbol}`
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  };

export default fetchCompareToData; 
