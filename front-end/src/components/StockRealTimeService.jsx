// StockService.jsx
import axios from "axios";

const fetchRealTimeData = async (symbol) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:5000/realtime_stock?symbol=${symbol}`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default fetchRealTimeData;
