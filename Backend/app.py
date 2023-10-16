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


    #Ticker
    stock = yf.Ticker(symbol)
<<<<<<< Updated upstream
    data = stock.history(period=period)  # Fetch data for 1 year

=======
    data = stock.history(period=period)
    news = stock.news
        
>>>>>>> Stashed changes
    # Convert Timestamp to string for chart data
    chart_data = {date.strftime('%Y-%m-%d'): close for date, close in data['Close'].items()}


    # # YEARLY RETURN AND YTD RETURN
    # # Calculate yearly return
    # if len(data) > 0:
    #     yearly_return = ((data['Close'].iloc[-1] - data['Close'].iloc[0]) / data['Close'].iloc[0]) * 100
    # else:
    #     yearly_return = "N/A"

    # # Calculate YTD return
    # start_of_year = data[data.index >= f"{data.index[-1].year}-01-01"]
    # if not start_of_year.empty:
    #     ytd_return = ((data['Close'].iloc[-1] - start_of_year['Close'].iloc[0]) / start_of_year['Close'].iloc[0]) * 100
    # else:
    #     ytd_return = "N/A"


    ''' TODO: Includes asset statistics such as:
    Current price, 
    previous closing price, 
    opening price, 
    volume, 
    market cap, 
    52-week range, 
    and Forward Dividend & Yield.

    'trailingPE': 36.634457,
    '''

    # ALL FETCHING DOWN BELOW
    current_price = data['Close'].iloc[-1].round(2) if not data.empty else "N/A"
    prev_close = stock.history(period="2d")['Close'].iloc[0].round(2) if len(stock.history(period="2d")) > 1 else "N/A"
    opening_price = data['Open'].iloc[-1].round(2) if not data.empty else "N/A"
    market_cap= format_market_cap(stock.info.get('marketCap',"N/A"))
    volume = data['Volume'].iloc[-1].round(2) if not data.empty else "N/A"
    fifty_two_week_range = (data['Low'].min().round(2), data['High'].max().round(2)) if not data.empty else ("N/A", "N/A")
    forward_dividend_yield = f"{stock.info.get('forwardPE', 'N/A')} x {stock.info.get('forwardEps', 'N/A')}" if stock.info.get('forwardPE') and stock.info.get('forwardEps') else "N/A"
    days_range = (data['Low'].iloc[-1].round(2), data['High'].iloc[-1].round(2)) if not data.empty else ("N/A", "N/A")
    beta = stock.info.get('beta', "N/A")

    if not data.empty:
        return jsonify({
            'current_price': current_price,
            'prev_close':prev_close,
            'opening_price': opening_price,
            'market_cap': market_cap,
            'volume': volume,
            'fifty_two_week_range': fifty_two_week_range,
            'forward_dividend_yield': forward_dividend_yield,
            'days_range': days_range,
            'beta': beta,
            'yearly_return': yearly_return,
            'ytd_return': ytd_return,
<<<<<<< Updated upstream
            'market_cap': stock.info.get('marketCap', "N/A"),
            'chart': chart_data
=======
            'chart': chart_data,
            'news' : news
>>>>>>> Stashed changes
        })
    else:
        return jsonify({'error': 'Could not fetch data for given symbol.'}), 400



if __name__ == '__main__':
    app.run(debug=True)

