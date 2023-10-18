from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf
import sys

print(sys.path)
app = Flask(__name__)
CORS(app)

@app.route('/stock', methods=['GET'])
def get_stock_data():
    symbol = request.args.get('symbol')
    print(f"Received request for symbol: {symbol}")  # This will log to console
    stock = yf.Ticker(symbol)
    data = stock.history(period="1mo")

    # Convert Timestamp to string
    chart_data = {date.strftime('%Y-%m-%d'): close for date, close in data['Close'].items()}

    if not data.empty:
        return jsonify({
            'current_price': data['Close'].iloc[-1],  # Use iloc to address warning
            'market_cap': stock.info.get('marketCap', "N/A"),
            'chart': chart_data
        })
    else:
        return jsonify({'error': 'Could not fetch data for given symbol.'}), 400



if __name__ == '__main__':
    app.run(debug=True)
