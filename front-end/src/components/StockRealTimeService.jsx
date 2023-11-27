// StockService.jsx
import axios from "axios";

// TODO: implement second url
const fetchRealTimeData = async (symbol) => {
  try {
    const response = await axios.get(
      `https://realtick.pythonanywhere.com/realtime_stock?symbol=${symbol}`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default fetchRealTimeData; 
