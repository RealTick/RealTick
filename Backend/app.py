from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf
import requests
import csv
from bs4 import BeautifulSoup
import json

app = Flask(__name__)
CORS(app)




@app.route('/stock', methods=['GET'])
def get_stock_data():

###### YFINANCE
    symbol = request.args.get('symbol')
    period = request.args.get('period', '5y')  # default to 1 year if no period is provided
    print(f"Received request for symbol: {symbol}")  # This will log to console

    # Ticker DEFINE
    stock = yf.Ticker(symbol)
    data = stock.history(period=period)  # Fetch data for 1 year
    
    # NewsS
    news = stock.news
        
    #Chart
    chart_data = {
        date.strftime('%Y-%m-%d'): {
            'open': open_val,
            'high': high_val,
            'low': low_val,
            'close': close_val,
            'volume': volume
        } 
        for date, open_val, high_val, low_val, close_val, volume in zip(data.index, data['Open'], data['High'], data['Low'], data['Close'], data['Volume']) #do we need down to the minute?
        #expected output: '2023-01-01': {'open': 100.0, 'high': 105.0, 'low': 98.0, 'close': 103.5, 'volume': xxxx}, ...
    }
###### END YFINANCE

    def format_market_cap(value):
            if value == "N/A":
                return value

            trillion = 1_000_000_000_000
            billion = 1_000_000_000
            million = 1_000_000

            if value >= trillion:
                return f"{value / trillion:.2f}T"
            elif value >= billion:
                return f"{value / billion:.2f}B"
            elif value >= million:
                return f"{value / million:.2f}M"
            else:
                return f"{value}"
            
    # Function to safely extract text from a tag
    def safe_get_text(tag):
        return tag.text.strip() if tag else "N/A"
    
    def get_stock_data(symbol):
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'}
        url=f'https://finance.yahoo.com/quote/{symbol}?p={symbol}'
        r=requests.get(url)
        soup=BeautifulSoup(r.text,'html.parser')
        similar_section= soup.find('section', id='similar-by-symbol')

        # TOP PART
        full_name = safe_get_text(soup.find('h1', {'class': 'D(ib) Fz(18px)'}))
        price_container = soup.find('div', {'class': 'D(ib) Mend(20px)'})
        fin_streamers = price_container.find_all('fin-streamer') if price_container else []
        real_time_price = safe_get_text(fin_streamers[0]) if len(fin_streamers) > 0 else "N/A"
        nominal_change = safe_get_text(fin_streamers[1].find('span')) if len(fin_streamers) > 1 else "N/A"
        percentage_change = safe_get_text(fin_streamers[2].find('span')) if len(fin_streamers) > 2 else "N/A"
        price_change = f"{nominal_change} {percentage_change}"

        # Second Column
        market_cap_value = safe_get_text(soup.find('td', {'data-test': 'MARKET_CAP-value'}))
        beta_5y_value = safe_get_text(soup.find('td', {'data-test': 'BETA_5Y-value'}))
        pe_ratio_value = safe_get_text(soup.find('td', {'data-test': 'PE_RATIO-value'}))
        eps_ratio_value = safe_get_text(soup.find('td', {'data-test': 'EPS_RATIO-value'}))
        earnings_date_value = safe_get_text(soup.find('td', {'data-test': 'EARNINGS_DATE-value'}))
        dividend_yield_value = safe_get_text(soup.find('td', {'data-test': 'DIVIDEND_AND_YIELD-value'}))
        ex_dividend_date_value = safe_get_text(soup.find('td', {'data-test': 'EX_DIVIDEND_DATE-value'}))
        one_year_target_est_value = safe_get_text(soup.find('td', {'data-test': 'ONE_YEAR_TARGET_PRICE-value'}))

        # First Column
        previous_close_value = safe_get_text(soup.find('td', {'data-test': 'PREV_CLOSE-value'}))
        open_value = safe_get_text(soup.find('td', {'data-test': 'OPEN-value'}))
        bid_value = safe_get_text(soup.find('td', {'data-test': 'BID-value'}))
        ask_value = safe_get_text(soup.find('td', {'data-test': 'ASK-value'}))
        days_range_value = safe_get_text(soup.find('td', {'data-test': 'DAYS_RANGE-value'}))
        fifty_two_wk_range_value = safe_get_text(soup.find('td', {'data-test': 'FIFTY_TWO_WK_RANGE-value'}))
        volume_value = safe_get_text(soup.find('td', {'data-test': 'TD_VOLUME-value'}))
        average_volume_3month_value = safe_get_text(soup.find('td', {'data-test': 'AVERAGE_VOLUME_3MONTH-value'}))

        # Construct a dictionary with all the information
        stock_info = {
            'Full_name': full_name,
            'RT_Price': real_time_price,
            'Price_Change': price_change,
            'Market_Cap': market_cap_value,
            'Beta': beta_5y_value,
            'PE': pe_ratio_value,
            'EPS': eps_ratio_value,
            'Earnings_Date': earnings_date_value,
            'Dividend_Yield': dividend_yield_value,
            'EX_dividend': ex_dividend_date_value,
            'target': one_year_target_est_value,
            'Close': previous_close_value,
            'Open': open_value,
            'Bid': bid_value,
            'Ask': ask_value,
            'days_range': days_range_value,
            '52WeekRange': fifty_two_wk_range_value,
            'Volume': volume_value,
            'Avg_volume': average_volume_3month_value,
            ####
            }

        symbols_json= None
        # Check if 'sec' is not None before continuing
        if similar_section:
            rows = similar_section.find('tbody').find_all('tr')

            # Initialize an empty list to store our symbols and titles
            symbols_list = []

            # Loop over each row and extract the symbol and title
            for row in rows:
                cell = row.find('td')
                symbol_link = cell.find('a')
                symbol_name = symbol_link.text.strip()  # Get the text of the symbol link
                title = cell.find('p')['title']  # Get the title attribute from the paragraph tag

                # Append a dictionary for each symbol to our list
                symbols_list.append({"Symbol": symbol_name, "Title": title})

            # Convert our list of dictionaries to a JSON string
            symbols_json = symbols_list
        return stock_info, symbols_json
    
    def stock_analysis(symbol):
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'
        }
        url = f'https://stockanalysis.com/stocks/{symbol}/'

        # Single request for all data
        response = requests.get(url, headers=headers)
        soup = BeautifulSoup(response.text, 'html.parser')

        # Function to scrape stock information
        def scrape_stock_info(soup):
            # Extract data based on the structure of the HTML and the text contained within the tags
            def extract_data(label_text):
                label_tag = soup.find('td', text=label_text)
                if label_tag:
                    value_tag = label_tag.find_next_sibling('td')
                    if value_tag:
                        return value_tag.text.strip()
                return "Not Found"

            keys = ["Market Cap", "Revenue (ttm)", "Net Income (ttm)", "Shares Out", "EPS (ttm)", "PE Ratio", "Forward PE", "Dividend", "Ex-Dividend Date", "Volume", "Open", "Previous Close", "Day's Range", "52-Week Range", "Beta", "Analysts", "Price Target", "Earnings Date"]


            # PRICE, CHANGE, FULL NAME
            parent_div = soup.find('div', class_='mb-5 flex flex-row items-end space-x-2 xs:space-x-3 bp:space-x-5')
            if not parent_div:
                return None

            # Extracting the required data
            price = parent_div.find('div', class_='text-4xl font-bold inline-block')
            price = price.text.strip() if price else "Not Found"

            # look for both classes
            change_div = parent_div.find('div', {'class': ['font-semibold inline-block text-2xl text-green-vivid', 'font-semibold inline-block text-2xl text-red-vivid']})
            change = change_div.text.strip() if change_div else "Not Found"

            # Full name
            full_name_tag = soup.find('h1', class_='mb-0 text-2xl font-bold text-default sm:text-[26px]')
            full_name = full_name_tag.text.strip() if full_name_tag else "N/A"


            # Mapping keys to your existing structure and adding new keys
            stock_info = {
                'Full_name': full_name,  # Assuming full name is not directly available
                'RT_Price': price,   # Real time price not directly available
                'Price_Change': change,  # Price change not directly available
                'Market_Cap': extract_data("Market Cap"),
                'Beta': extract_data("Beta"),
                'PE': extract_data("PE Ratio"),
                'EPS': extract_data("EPS (ttm)"),
                'Earnings_Date': extract_data("Earnings Date"),
                'Dividend_Yield': extract_data("Dividend"),  # Note: Might not be exact equivalent
                'EX_dividend': extract_data("Ex-Dividend Date"),
                'target': extract_data("Price Target"),
                'Close': extract_data("Previous Close"),
                'Open': extract_data("Open"),
                'Bid': "N/A",  # Bid value not directly available
                'Ask': "N/A",  # Ask value not directly available
                'days_range': extract_data("Day's Range"),
                '52WeekRange': extract_data("52-Week Range"),
                'Volume': extract_data("Volume"),
                'Avg_volume': "N/A",  # Average volume not directly available
                # Additional keys from Stock Analysis
                'Revenue': extract_data("Revenue (ttm)"),
                'Net_Income': extract_data("Net Income (ttm)"),
                'Shares_Out': extract_data("Shares Out"),
                'Forward_PE': extract_data("Forward PE"),
                'Analysts': extract_data("Analysts")
            }
            return stock_info
            #return {key: extract_data(key) for key in keys}

        

        # Perform all scraping using the same soup object
        stock_info_data = scrape_stock_info(soup)

        
        # json_output = json.dumps(all_data,indent=4)
        return stock_info_data
    
    
    # IN HOUSE SCRAPER CALL (YAHOO FINANCE)
    stock_info, similar_symbols_json = get_stock_data(symbol)
    stockanalysis_info=stock_analysis(symbol)
    print(stockanalysis_info)
    
    # IN HOUSE SCRAPER CALL (STOCKANALYSIS)
    
    '''
    TESTING
        # print(type(similar_symbols_json))
        # print(similar_symbols_json)
        # print(type(news))
        #print(stock_info)
    '''
    
    
    # #YAHOO FINANCE
    # if not data.empty:
    #     return jsonify({
    #         'chart': chart_data,
    #         'news':news,
    #         'stock_display_name': stock_info['Full_name'],
    #         'current_price': stock_info['RT_Price'],
    #         'prev_close': stock_info['Close'],
    #         'opening_price': stock_info['Open'],
    #         'market_cap': stock_info['Market_Cap'],
    #         'volume': stock_info['Volume'],
    #         'fifty_two_week_range': stock_info['52WeekRange'],
    #         'forward_dividend_yield': stock_info['Dividend_Yield'],
    #         'days_range': stock_info['days_range'],
    #         'beta': stock_info['Beta'],
    #         'bid': stock_info['Bid'],
    #         'ask': stock_info['Ask'],
    #         'price_diff': stock_info['Price_Change'],
    #         'earnings_date':stock_info['Earnings_Date'],
    #         'yr_target':stock_info['target'],
    #         'Avg_volume': stock_info['Avg_volume'],
    #         'PE_ratio':stock_info['PE'],
    #         'EPS':stock_info['EPS'],
    #         'EX_dividend':stock_info['EX_dividend'],
    #         'similar_stocks': similar_symbols_json,

    #     })
    # else:
    #     return jsonify({'error': ' Could not fetch data for given symbol.'}), 400
    
    
    # STOCK ANALYISIS
    if not data.empty:
        return jsonify({
            'chart': chart_data,
            'news':news,
            'stock_display_name': stockanalysis_info['Full_name'],
            'current_price': stockanalysis_info['RT_Price'],
            'prev_close': stockanalysis_info['Close'],
            'opening_price': stockanalysis_info['Open'],
            'market_cap': stockanalysis_info['Market_Cap'],
            'volume': stockanalysis_info['Volume'],
            'fifty_two_week_range': stockanalysis_info['52WeekRange'],
            'forward_dividend_yield': stockanalysis_info['Dividend_Yield'],
            'days_range': stockanalysis_info['days_range'],
            'beta': stockanalysis_info['Beta'],
            'bid': "REMOVE THIS",
            'ask': "REMOVE THIS",
            'price_diff': stockanalysis_info['Price_Change'],
            'earnings_date':stockanalysis_info['Earnings_Date'],
            'yr_target':stockanalysis_info['target'],
            'Avg_volume': "REMOVE THIS",
            'PE_ratio':stockanalysis_info['PE'],
            'EPS':stockanalysis_info['EPS'],
            'EX_dividend':stockanalysis_info['EX_dividend'],
            'similar_stocks': similar_symbols_json,

        })
    else:
        return jsonify({'error': ' Could not fetch data for given symbol.'}), 400
    
    
    

# YFINANCEreal-time data
@app.route('/realtime_stock', methods=['GET'])
def get_realtime_stock_data():
    symbol = request.args.get('symbol')
    if not symbol:
        return jsonify({'error': 'No symbol provided'}), 400

    try:
        # Fetch real-time data from yfinance
        real_time_data = yf.download(symbol, period="2d", interval='1m')

        # Check if the data is not empty
        if real_time_data.empty:
            return jsonify({'error': 'No data available for the given symbol'}), 404

        # Convert the DataFrame to a dictionary for JSON response
        real_time_dict = real_time_data.to_dict(orient='index')

        return jsonify(real_time_dict)

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)