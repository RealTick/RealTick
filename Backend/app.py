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

    # Ticker DEFINE
    stock = yf.Ticker(symbol)
    data = stock.history(period=period)  # Fetch data for 1 year
    
    # News
    news = stock.news
        
    # Convert Timestamp to string for chart data
    # chart_data = {date.strftime('%Y-%m-%d'): close for date, close in data['Close'].items()}
    chart_data = {
        date.strftime('%Y-%m-%d'): {
            'open': open_val,
            'high': high_val,
            'low': low_val,
            'close': close_val
        } 
        for date, open_val, high_val, low_val, close_val in zip(data.index, data['Open'], data['High'], data['Low'], data['Close'])
    }

    # Calculate yearly return
    if len(data) > 0:
        yearly_return = (((data['Close'].iloc[-1] - data['Close'].iloc[0]) / data['Close'].iloc[0]) * 100).round(2)
    else:
        yearly_return = "N/A"

    # Calculate YTD return
    start_of_year = data[data.index >= f"{data.index[-1].year}-01-01"]
    if not start_of_year.empty:
        ytd_return = (((data['Close'].iloc[-1] - start_of_year['Close'].iloc[0]) / start_of_year['Close'].iloc[0]) * 100).round(2)
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
    def format_market_cap(value):
        if value == "N/A":
            return value

        trillion = 1_000_000_000_000
        billion = 1_000_000_000
        million = 1_000_000

        if value >= trillion:
            return f"{value / trillion:.3f}T"
        elif value >= billion:
            return f"{value / billion:.3f}B"
        elif value >= million:
            return f"{value / million:.3f}M"
        else:
            return f"{value}"

    
    # ALL FETCHING DOWN BELOW
    current_price = data['Close'].iloc[-1].round(2) if not data.empty else "N/A"
    prev_close = stock.history(period="2d")['Close'].iloc[0].round(2) if len(stock.history(period="2d")) > 1 else "N/A"
    opening_price = data['Open'].iloc[-1].round(2) if not data.empty else "N/A"
    market_cap= format_market_cap(stock.info.get('marketCap',"N/A"))
    volume_unformatted = int(data['Volume'].iloc[-1].round(2)) if not data.empty else "N/A"
    volume = "{:,}".format(volume_unformatted) if not isinstance(volume_unformatted, str) else volume_unformatted

    fifty_two_week_range_tuple = (data['Low'].min().round(2), data['High'].max().round(2)) if not data.empty else ("N/A", "N/A")
    fifty_two_week_range= f"{fifty_two_week_range_tuple[0]} - {fifty_two_week_range_tuple[1]}" if not data.empty else "N/A"
    forward_dividend_yield = f"{stock.info.get('forwardPE', 'N/A')} x {stock.info.get('forwardEps', 'N/A')}" if stock.info.get('forwardPE') and stock.info.get('forwardEps') else "N/A"
    days_range_tuple = (data['Low'].iloc[-1].round(2), data['High'].iloc[-1].round(2)) if not data.empty else ("N/A", "N/A")
    days_range=f"{days_range_tuple[0]} - {days_range_tuple[1]}" if not data.empty else "N/A"
    beta = stock.info.get('beta', "N/A")
    stock_long_name=stock.info.get('longName')
    stock_short_name=stock.info.get('shortName')
    stock_symbol=stock.info.get('symbol')
    stock_display_name=stock_long_name+f' ({stock_symbol})'

    if not data.empty:
        return jsonify({
            'stock_display_name': stock_display_name,
            'long_name': stock_long_name,
            'short_name':stock_short_name,
            'symbol': stock_symbol,
            'current_price': current_price,
            'prev_close': prev_close,
            'opening_price': opening_price,
            'market_cap': market_cap,
            'volume': volume,
            'fifty_two_week_range': fifty_two_week_range,
            'forward_dividend_yield': forward_dividend_yield,
            'days_range': days_range,
            'beta': beta,
            'yearly_return': yearly_return,
            'ytd_return': ytd_return,
            'chart': chart_data,
            'news':news
        })
    else:
        return jsonify({'error': 'Could not fetch data for given symbol.'}), 400



if __name__ == '__main__':
    app.run(debug=True)

