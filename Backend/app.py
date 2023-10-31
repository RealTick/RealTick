from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf
import requests

app = Flask(__name__)
CORS(app)


def alpha_vantage():
    # https://colab.research.google.com/drive/1IoGts7YVAkwQ5CETb4DPE5IyhGjGBPYb#scrollTo=abSSNFQZIcYp
    # Variables
    api = "Y8LETOLT99NRN9CG"
    symbol="AAPL"

    # INTRADAY DATA
    """
    This API returns current and 20+ years of historical intraday OHLCV time series of the equity specified,
    overing extended trading hours where applicable (e.g., 4:00am to 8:00pm Eastern Time for the US market).
    You can query both raw (as-traded) and split/dividend-adjusted intraday data from this endpoint. 
    The OHLCV data is sometimes called "candles" in finance literature.
    https://www.alphavantage.co/documentation/
    """
    URL_INTRADAY = f'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol={symbol}&interval=5min&apikey={api}'
    current_url = URL_INTRADAY
    r = requests.get(current_url)
    alpha_chart_data = r.json()
    # alpha_chart_data

    alpha_chart_data_transformed = {
        date: {
            'open': float(stock_data['1. open']),
            'high': float(stock_data['2. high']),
            'low': float(stock_data['3. low']),
            'close': float(stock_data['4. close'])
        }
        for date, stock_data in alpha_chart_data['Time Series (5min)'].items()
    }

    #print(alpha_chart_data_transformed)
    #alpha_chart_data_transformed

    # END INTRADAY DATA

    # Global QUOTE
    # A lightweight alternative to the time series APIs, this service returns the latest price and volume information for a ticker of your choice.
    URL_QUOTE = f'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={symbol}&apikey={api}'
    current_url = URL_QUOTE
    r = requests.get(current_url)
    data = r.json()
    quote = data['Global Quote']

    # Transform the data
    alpha_transformed_data = {
        'symbol': quote['01. symbol'],
        'open': quote['02. open'],
        'high': quote['03. high'],
        'low': quote['04. low'],
        'price': quote['05. price'],
        'volume': quote['06. volume'],
        'latest trading day': quote['07. latest trading day'],
        'previous close': quote['08. previous close'],
        'change': quote['09. change'],
        'change percent': quote['10. change percent']
    }
    #alpha_transformed_data['volume']


@app.route('/stock', methods=['GET'])
def get_stock_data():

###### YFINANCE
    symbol = request.args.get('symbol')
    period = request.args.get('period', '2y')  # default to 1 year if no period is provided
    print(f"Received request for symbol: {symbol}")  # This will log to console

    # Ticker DEFINE
    stock = yf.Ticker(symbol)
    data = stock.history(period=period)  # Fetch data for 1 year
    
    # News
    news = stock.news
        
    #Chart
    chart_data = {
        date.strftime('%Y-%m-%d'): {
            'open': open_val,
            'high': high_val,
            'low': low_val,
            'close': close_val
        } 
        for date, open_val, high_val, low_val, close_val in zip(data.index, data['Open'], data['High'], data['Low'], data['Close']) #do we need down to the minute?
        #expected output: '2023-01-01': {'open': 100.0, 'high': 105.0, 'low': 98.0, 'close': 103.5}, ...
    }

    # # Calculate yearly return
    # if len(data) > 0:
    #     yearly_return = (((data['Close'].iloc[-1] - data['Close'].iloc[0]) / data['Close'].iloc[0]) * 100).round(2)
    # else:
    #     yearly_return = "N/A"

    # # Calculate YTD return
    # start_of_year = data[data.index >= f"{data.index[-1].year}-01-01"]
    # if not start_of_year.empty:
    #     ytd_return = (((data['Close'].iloc[-1] - start_of_year['Close'].iloc[0]) / start_of_year['Close'].iloc[0]) * 100).round(2)
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
    '''

    # def format_market_cap(value):
    #     if value == "N/A":
    #         return value

    #     trillion = 1_000_000_000_000
    #     billion = 1_000_000_000
    #     million = 1_000_000

    #     if value >= trillion:
    #         return f"{value / trillion:.3f}T"
    #     elif value >= billion:
    #         return f"{value / billion:.3f}B"
    #     elif value >= million:
    #         return f"{value / million:.3f}M"
    #     else:
    #         return f"{value}"

    
    # ALL FETCHING DOWN BELOW
    # current_price = stock.info['currentPrice'] #data['Close'].iloc[-1].round(2) if not data.empty else "N/A"
    # prev_close = stock.history(period="2d")['Close'].iloc[0].round(2) if len(stock.history(period="2d")) > 1 else "N/A"
    # opening_price = stock.info['open'] #data['Open'].iloc[-1].round(2) if not data.empty else "N/A"
    # market_cap= format_market_cap(stock.info.get('marketCap',"N/A"))
    # volume_unformatted = int(data['Volume'].iloc[-1].round(2)) if not data.empty else "N/A"
    # volume = "{:,}".format(volume_unformatted) if not isinstance(volume_unformatted, str) else volume_unformatted

    # fifty_two_week_range_tuple = (data['Low'].min().round(2), data['High'].max().round(2)) if not data.empty else ("N/A", "N/A")
    # fifty_two_week_range= f"{fifty_two_week_range_tuple[0]} - {fifty_two_week_range_tuple[1]}" if not data.empty else "N/A"
    # forward_dividend_yield = f"{stock.info.get('forwardPE', 'N/A')} x {stock.info.get('forwardEps', 'N/A')}" if stock.info.get('forwardPE') and stock.info.get('forwardEps') else "N/A"
    # days_range_tuple = (data['Low'].iloc[-1].round(2), data['High'].iloc[-1].round(2)) if not data.empty else ("N/A", "N/A")
    # days_range=f"{days_range_tuple[0]} - {days_range_tuple[1]}" if not data.empty else "N/A"
    # beta = stock.info.get('beta', "N/A")
    # stock_long_name=stock.info.get('longName')
    # stock_short_name=stock.info.get('shortName')
    # stock_symbol=stock.info.get('symbol')
    # stock_display_name=stock_long_name+f' ({stock_symbol})'
    # price_diff=(current_price-prev_close).round(3)
    # price_diff_percentage=((current_price-prev_close)/(prev_close)*100).round(3) 
    # END
###### END OF YFINANCE


    #ALPHA VANTAGE
    api = "Y8LETOLT99NRN9CG"
    url_pricing = f'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={symbol}&apikey={api}'
    r1 = requests.get(url_pricing)
    data_pricing = r1.json()
    quote = data_pricing['Global Quote']

    # Extracting each variable
    symbol_alpha = quote['01. symbol']
    open_price = quote['02. open']
    high = quote['03. high']
    low = quote['04. low']
    price = quote['05. price']
    volume = quote['06. volume']
    latest_trading_day = quote['07. latest trading day']
    previous_close = quote['08. previous close']
    change = quote['09. change']
    change_percent = quote['10. change percent']


    url_company = f'https://www.alphavantage.co/query?function=OVERVIEW&symbol={symbol}&apikey={api}'
    r2 = requests.get(url_company)
    data_company = r2.json()

    # Extracting all variables
    (
        Symbol, AssetType, Long_name, Description, CIK, Exchange, Currency, Country, Sector, Industry, Address, 
        FiscalYearEnd, LatestQuarter, MarketCapitalization, EBITDA, PERatio, PEGRatio, BookValue, 
        DividendPerShare, DividendYield, EPS, RevenuePerShareTTM, ProfitMargin, OperatingMarginTTM, 
        ReturnOnAssetsTTM, ReturnOnEquityTTM, RevenueTTM, GrossProfitTTM, DilutedEPSTTM, QuarterlyEarningsGrowthYOY, 
        QuarterlyRevenueGrowthYOY, AnalystTargetPrice, TrailingPE, ForwardPE, PriceToSalesRatioTTM, 
        PriceToBookRatio, EVToRevenue, EVToEBITDA, Beta, _52WeekHigh, _52WeekLow, _50DayMovingAverage, 
        _200DayMovingAverage, SharesOutstanding, DividendDate, ExDividendDate
    ) = data_company.values()

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

    current_price = price
    prev_close=previous_close
    opening_price=open_price
    market_cap=format_market_cap(int(MarketCapitalization))
    volume_output = "{:,}".format(int(volume))
    fifty_two_week_range= f"{_52WeekLow} - {_52WeekHigh}"
    ### TODO: HAVE N/A IF dividenpershare is 0
    forward_dividend_yield = f"{DividendPerShare} ({float(DividendYield) * 100}%)"
    days_range = f"{round(float(low), 2):.2f} - {round(float(high), 2):.2f}"
    beta=Beta
    stock_display_name=Long_name+f' ({symbol_alpha})'
    price_diff=change
    price_diff_percentage=change_percent

    


    if not data.empty:
        return jsonify({
            'stock_display_name': stock_display_name,
            'symbol': symbol,
            'current_price': current_price,
            'prev_close': prev_close,
            'opening_price': opening_price,
            'market_cap': market_cap,
            'volume': volume_output,
            'fifty_two_week_range': fifty_two_week_range,
            'forward_dividend_yield': forward_dividend_yield,
            'days_range': days_range,
            'beta': beta,
            'yearly_return': 0,
            'ytd_return': 0,
            'chart': chart_data,
            'news':news,
            'price_diff': price_diff,
            'price_diff_percentage': price_diff_percentage
        })
    else:
        return jsonify({'error': 'Could not fetch data for given symbol.'}), 400



if __name__ == '__main__':
    app.run(debug=True)

