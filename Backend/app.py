from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf

app = Flask(__name__)
CORS(app)

@app.route('/stock', methods=['GET'])
def get_stock_data():
    symbol = request.args.get('symbol')
    period = request.args.get('period', '1y')  # default to 1 year if no period is provided
    print(f"Received request for symbol: {symbol}")  # This will log to console
    stock = yf.Ticker(symbol)
    data = stock.history(period=period)  # Fetch data for 1 year
    news = stock.news
        
    # Convert Timestamp to string for chart data
    chart_data = {date.strftime('%Y-%m-%d'): close for date, close in data['Close'].items()}

    # Fetch opening price
    opening_price = data['Open'].iloc[-1]

    # Calculate yearly return
    if len(data) > 0:
        yearly_return = ((data['Close'].iloc[-1] - data['Close'].iloc[0]) / data['Close'].iloc[0]) * 100
    else:
        yearly_return = "N/A"

    # Calculate YTD return
    start_of_year = data[data.index >= f"{data.index[-1].year}-01-01"]
    if not start_of_year.empty:
        ytd_return = ((data['Close'].iloc[-1] - start_of_year['Close'].iloc[0]) / start_of_year['Close'].iloc[0]) * 100
    else:
        ytd_return = "N/A"


    ''' TODO: Includes asset statistics such as:
    Current price, 
    previous closing price, 
    opening price, 
    volume, 
    market cap, 
    52-week range, 
    and Forward Dividend & Yield.
    '''

    if not data.empty:
        return jsonify({
            'current_price': data['Close'].iloc[-1],
            'opening_price': opening_price,
            'yearly_return': yearly_return,
            'ytd_return': ytd_return,
            'market_cap': stock.info.get('marketCap', "N/A"),
            'chart': chart_data,
            'news' : news
        })
    else:
        return jsonify({'error': 'Could not fetch data for given symbol.'}), 400



if __name__ == '__main__':
    app.run(debug=True)

