// StockService.jsx
import axios from "axios";

const fetchData = async (symbol) => {
  try {
    const response = await axios.get(
      `https://realtick.pythonanywhere.com/stock?symbol=${symbol}`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default fetchData;
