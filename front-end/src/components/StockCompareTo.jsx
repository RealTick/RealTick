// StockService.jsx
import axios from "axios";


const fetchCompareToData = async (symbol) => {  
    try {
      const response = await axios.get(
        `https://realtick.pythonanywhere.com/compare_to?symbol=${symbol}`
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  };

export default fetchCompareToData; 
