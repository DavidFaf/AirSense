# # app.py
# from flask import Flask, request, jsonify
# import pandas as pd
# import numpy as np
# from statsmodels.tsa.arima.model import ARIMA
# from datetime import datetime, timedelta
# from flask_cors import CORS
# import time
# from sklearn.metrics import mean_squared_error, mean_absolute_error

# app = Flask(__name__)
# CORS(app)

# def calculate_metrics(actual, predicted):
#     """Calculate all required performance metrics"""
#     actual = np.array(actual)
#     predicted = np.array(predicted)
    
#     # Handle division by zero in MAPE
#     mask = actual != 0
#     actual_non_zero = actual[mask]
#     predicted_non_zero = predicted[mask]
    
#     mape = np.mean(np.abs((actual_non_zero - predicted_non_zero) / actual_non_zero)) * 100 if len(actual_non_zero) > 0 else float('nan')
    
#     return {
#         'mse': mean_squared_error(actual, predicted),
#         'mae': mean_absolute_error(actual, predicted),
#         'rmse': np.sqrt(mean_squared_error(actual, predicted)),
#         'mape': mape
#     }

# def prepare_time_series(data):
#     """Convert historical data into time series for each pollutant"""
#     series = {}
    
#     for entry in data['list']:
#         timestamp = datetime.fromtimestamp(entry['dt'])
#         for pollutant, value in entry['components'].items():
#             if pollutant not in series:
#                 series[pollutant] = []
#             series[pollutant].append({
#                 'timestamp': timestamp,
#                 'value': value
#             })
    
#     # Convert to DataFrames
#     dfs = {}
#     for pollutant, values in series.items():
#         df = pd.DataFrame(values)
#         df.set_index('timestamp', inplace=True)
#         df = df.resample('D').mean().ffill()  # Resample to daily and forward fill
#         dfs[pollutant] = df['value']
    
#     return dfs

# def make_forecast(series, steps=7):
#     """Generate forecasts and calculate metrics for a single time series"""
#     try:
#         # Split into train and test (last 'steps' points for validation)
#         train = series.iloc[:-steps]
#         test = series.iloc[-steps:]
        
#         # Fit ARIMA model 
#         model = ARIMA(train, order=(1, 0, 1))
#         model_fit = model.fit()
        
#         # Make forecast
#         forecast = model_fit.forecast(steps=steps)
        
#         # Calculate metrics
#         metrics = calculate_metrics(test.values, forecast.values)
        
#         return {
#             'forecast': forecast.tolist(),
#             'metrics': metrics
#         }
#     except Exception as e:
#         print(f"Error forecasting: {e}")
#         return None

# @app.route('/api/forecast', methods=['POST'])
# def forecast():
#     start_time = time.time()
#     try:
#         data = request.get_json()
#         historical_data = data['historicalPollutants']
#         current_data = data['currentPollutants']
        
#         # Combine current data with historical (current is most recent)
#         combined_data = historical_data.copy()
#         combined_data['list'].extend(current_data['list'])
        
#         # Prepare time series data
#         time_series = prepare_time_series(combined_data)
        
#         # Generate forecasts for each pollutant
#         forecasts = {}
#         forecast_dates = []
#         performance_metrics = {}
#         steps = 4  # Forecast next 7 days
        
#         # Generate forecast dates (daily)
#         last_timestamp = datetime.fromtimestamp(current_data['list'][0]['dt'])
#         forecast_dates = [last_timestamp + timedelta(days=i) for i in range(1, steps+1)]
        
#         for pollutant, series in time_series.items():
#             result = make_forecast(series, steps=steps)
#             if result:
#                 forecasts[pollutant] = result['forecast']
#                 performance_metrics[pollutant] = result['metrics']
        
#         # Calculate overall metrics (average across pollutants)
#         overall_metrics = {
#             'mse': np.mean([m['mse'] for m in performance_metrics.values()]),
#             'mae': np.mean([m['mae'] for m in performance_metrics.values()]),
#             'rmse': np.mean([m['rmse'] for m in performance_metrics.values()]),
#             'mape': np.nanmean([m['mape'] for m in performance_metrics.values()]),  # Handle NaN for MAPE
#             'processing_time_seconds': time.time() - start_time
#         }
        
#         # Prepare response
#         response = {
#             'forecast_dates': [date.isoformat() for date in forecast_dates],
#             'forecasts': forecasts,
#             'location': {
#                 'lat': current_data['coord']['lat'],
#                 'lon': current_data['coord']['lon']
#             },
#             'performance_metrics': {
#                 'overall': overall_metrics,
#                 'by_pollutant': performance_metrics
#             }
#         }
        
#         return jsonify(response)
    
#     except Exception as e:
#         return jsonify({
#             'error': str(e),
#             'performance_metrics': {
#                 'processing_time_seconds': time.time() - start_time
#             }
#         }), 500

# if __name__ == '__main__':
#     app.run(debug=True)


## Model 2 - ARIMA

# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from statsmodels.tsa.arima.model import ARIMA
# import numpy as np
# import pandas as pd
# import time
# from datetime import datetime, timedelta
# from sklearn.metrics import mean_squared_error, mean_absolute_error

# app = Flask(__name__)
# CORS(app)

# @app.route('/api/forecast', methods=['POST'])
# def forecast_pollutants():
#     start_time = time.time()

#     data = request.get_json()
#     historical = data.get('historicalPollutants', {})
#     location = historical.get('coord', {})

#     pollutants = ['co', 'no', 'no2', 'o3', 'so2', 'pm2_5', 'pm10', 'nh3']
#     history_list = historical.get('list', [])

#     # Prepare DataFrame
#     records = []
#     for entry in history_list:
#         dt = datetime.utcfromtimestamp(entry['dt'])
#         row = {'date': dt}
#         for pollutant in pollutants:
#             row[pollutant] = entry['components'].get(pollutant, np.nan)
#         records.append(row)
    
#     df = pd.DataFrame(records).set_index('date')
#     df = df.sort_index()

#     forecasts = {}
#     forecast_dates = [(df.index[-1] + timedelta(days=i+1)).strftime('%Y-%m-%d') for i in range(7)]
#     errors = []

#     # Forecast each pollutant
#     for pollutant in pollutants:
#         series = df[pollutant].dropna()

#         if len(series) < 3:
#             forecasts[pollutant] = [None] * 7
#             continue

#         try:
#             model = ARIMA(series, order=(1, 1, 1))  # simple ARIMA
#             model_fit = model.fit()
#             pred = model_fit.forecast(steps=7)
#             forecasts[pollutant] = pred.tolist()

#             # Error metrics using last 3 days vs model prediction
#             if len(series) >= 10:
#                 train = series[:-3]
#                 test = series[-3:]
#                 model = ARIMA(train, order=(1,1,1)).fit()
#                 test_pred = model.forecast(steps=3)
#                 mse = mean_squared_error(test, test_pred)
#                 mae = mean_absolute_error(test, test_pred)
#                 rmse = np.sqrt(mse)
#                 mape = np.mean(np.abs((test - test_pred) / test)) * 100
#                 errors.append({'mse': mse, 'mae': mae, 'rmse': rmse, 'mape': mape})
#         except Exception as e:
#             forecasts[pollutant] = [None] * 7

#     # Aggregate errors
#     if errors:
#         avg_mse = np.mean([e['mse'] for e in errors])
#         avg_mae = np.mean([e['mae'] for e in errors])
#         avg_rmse = np.mean([e['rmse'] for e in errors])
#         avg_mape = np.mean([e['mape'] for e in errors])
#     else:
#         avg_mse = avg_mae = avg_rmse = avg_mape = None

#     processing_time = round(time.time() - start_time, 2)

#     return jsonify({
#         'forecast_dates': forecast_dates,
#         'forecasts': forecasts,
#         'location': location,
#         'performance_metrics': {
#             'overall': {
#                 'mse': avg_mse,
#                 'mae': avg_mae,
#                 'rmse': avg_rmse,
#                 'mape': 90,
#                 'processing_time_seconds': processing_time
#             }
#         }
#     })

# if __name__ == '__main__':
#     app.run(debug=True)


## Model 3 - ARIMA
from flask import Flask, request, jsonify
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_squared_error, mean_absolute_error
import numpy as np
import pandas as pd
from flask_cors import CORS
from datetime import datetime, timedelta
import time
import os
import json
import re
import requests
from dotenv import load_dotenv



app = Flask(__name__)
CORS(app)

@app.route('/api/forecast', methods=['POST'])
def forecast_pollutants():
    start_time = time.time()
    data = request.get_json()
    historical = data.get('historicalPollutants', {})
    location = historical.get('coord', {})
    history_list = historical.get('list', [])

    pollutants = ['co', 'no', 'no2', 'o3', 'so2', 'pm2_5', 'pm10', 'nh3']

    # Convert to DataFrame
    records = []
    for entry in history_list:
        row = {'date': datetime.utcfromtimestamp(entry['dt'])}
        for pollutant in pollutants:
            row[pollutant] = entry['components'].get(pollutant, np.nan)
        records.append(row)

    df = pd.DataFrame(records).set_index('date').sort_index()

    # Prepare forecast structure
    forecast_list = []
    metrics = {}
    base_timestamp = df.index[-1]

    for pollutant in pollutants:
        series = df[pollutant].dropna()
        metric_result = {}
        if len(series) < 4:
            # Not enough data
            predictions = [series.iloc[-1] if len(series) > 0 else 0] * 7
        else:
            try:
                model = ARIMA(series, order=(1, 1, 1))
                model_fit = model.fit()
                predictions = model_fit.forecast(steps=7)

                # Metrics (on last 3 days if possible)
                if len(series) >= 10:
                    train = series[:-3]
                    test = series[-3:]
                    test_model = ARIMA(train, order=(1, 1, 1)).fit()
                    test_pred = test_model.forecast(steps=3)

                    mse = mean_squared_error(test, test_pred)
                    mae = mean_absolute_error(test, test_pred)
                    rmse = np.sqrt(mse)

                    metric_result = {
                        "mse": round(mse, 4),
                        "mae": round(mae, 4),
                        "rmse": round(rmse, 4),
                    }
            except Exception as e:
                predictions = [series.iloc[-1]] * 7

        # Add to forecast list
        for i in range(7):
            forecast_date = base_timestamp + timedelta(days=i + 1)
            if i >= len(forecast_list):
                forecast_list.append({
                    "dt": int(forecast_date.timestamp()),
                    "main": {"aqi": 1},  # You can calculate actual AQI if needed
                    "components": {}
                })
            forecast_list[i]["components"][pollutant] = round(predictions.iloc[i], 3)

        if metric_result:
            metrics[pollutant] = metric_result

    processing_time = round(time.time() - start_time, 2)

    return jsonify({
        "coord": [location.get("lon"), location.get("lat")],
        "list": forecast_list,
        "metrics": metrics,
        "processing_time_seconds": processing_time
    })


load_dotenv()
# Configure Hugging Face settings
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
# API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1"
API_URL = "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct"
print(HUGGINGFACE_API_KEY)

HEADERS = {
    "Authorization": f"Bearer {HUGGINGFACE_API_KEY}",
    "Content-Type": "application/json"
}


def parse_response(raw_text):
    """ Extract structured data from the LLM output """
    # Example structure:
    # 1. Health impact assessment: ...
    # 2. Notable trends: ...
    # 3. Actionable recommendations:
    #    - ...
    #    - ...
    #    - ...

    # Simple regex patterns
    health_pattern = r"1\.\s*Health impact assessment:?\s*(.+?)\s*2\."
    trends_pattern = r"2\.\s*Notable trends:?\s*(.+?)\s*3\."
    recommendations_pattern = r"3\.\s*.+?:?\s*((?:- .+\n?)+)"

    health = re.search(health_pattern, raw_text, re.DOTALL)
    trends = re.search(trends_pattern, raw_text, re.DOTALL)
    recs = re.search(recommendations_pattern, raw_text, re.DOTALL)

    return {
        "health_recommendation": health.group(1).strip() if health else "No health info found.",
        "possible_causes": trends.group(1).strip() if trends else "No trend info found.",
        "insights": [line[2:].strip() for line in recs.group(1).strip().splitlines()] if recs else []
    }


# @app.route('/generate-insights', methods=['POST'])
# def generate_insights():
#     try:
#         data = request.get_json()

#         if "list" not in data or not isinstance(data["list"], list):
#             return jsonify({"error": "Invalid format: missing 'list' of pollutants"}), 400

#         MAX_ENTRIES = 10
#         pollutant_history = data["list"][:MAX_ENTRIES]

#         prompt = f"""
#         You are an air quality analyst. You will be given historical air pollutant data. Your job is to:

#         1. Identify notable trends in the data
#         2. Assess health impacts based on observed pollutant levels
#         3. Recommend 3 actionable steps people can take to stay safe

#         Return your output strictly as JSON with the following format:

#         {{
#         "possible_causes": "...",
#         "health_recommendation": "...",
#         "insights": [
#             "...",
#             "...",
#             "..."
#         ]
#         }}

#         Historical data: {json.dumps(pollutant_history, indent=2)}
#         """

#         print({json.dumps(pollutant_history, indent=2)})
#         response = requests.post(API_URL, headers=HEADERS, json={"inputs": prompt})

#         if response.status_code == 200:
#             print("🔮 Insightful Response from Qwen LLM:")
#             print(response.json())
#             return jsonify(response.json()[0]["generated_text"]), 200
#         else:
#             print(f"❌ Error: {response.status_code}")
#             print(response.text)
#             return(response.text), response.status_code

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# @app.route('/generate-insights', methods=['POST'])
# def generate_insights():
#     try:
#         data = request.get_json()

#         if "list" not in data or not isinstance(data["list"], list):
#             return jsonify({"error": "Invalid format: missing 'list' of pollutants"}), 400

#         MAX_ENTRIES = 20
#         pollutant_history = data["list"][:MAX_ENTRIES]

#         prompt = f"""
#         You are an air quality expert. Analyze the following historical pollutant data for a location:
#         {json.dumps(pollutant_history, indent=2)}

#         Generate:
#         1. Health impact assessment
#         2. Notable trends
#         3. 3 actionable recommendations (as bullet points)
#         """

#         response = requests.post(API_URL, headers=HEADERS, json={"inputs": prompt})

#         if response.status_code == 200:
#             raw_output = response.json()[0]["generated_text"]
#             formatted = parse_response(raw_output)
#             return jsonify(formatted), 200
#         else:
#             return jsonify({
#                 "error": "Hugging Face API error",
#                 "status_code": response.status_code,
#                 "details": response.text
#             }), response.status_code

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

@app.route("/generate-insights", methods=["POST"])
def generate_insights():
    data = request.get_json()

    if "list" not in data or not isinstance(data["list"], list):
             return jsonify({"error": "Invalid format: missing 'list' of pollutants"}), 400
    
    MAX_ENTRIES = 20
    pollutant_history = data["list"][:MAX_ENTRIES]

    prompt = f"""
You are an air quality analyst. You will be given historical air pollutant data. Your job is to:

1. Identify notable trends in the data  
2. Assess health impacts based on observed pollutant levels  
3. Recommend 3 actionable steps people can take to stay safe

Return your output strictly as JSON with the following format:

{{
  "possible_causes": "...",
  "health_recommendation": "...",
  "insights": [
    "...",
    "...",
    "..."
  ]
}}

Historical data: {json.dumps(pollutant_history, indent=2)}
"""

#     prompt = f"""
# You are an air quality analyst. You will be given historical air pollutant data. Your job is to:

# 1. Identify notable trends in the data
# 2. Assess health impacts based on observed pollutant levels
# 3. Recommend 5 actionable steps people can take to stay safe

# Your response must be in **strict JSON format** and include the following keys:

# - "possible_causes": Short summary (e.g., "Industrial or vehicular emissions")
# - "health_recommendation": Concise advice (2 lines max)
# - "insights": Array of 5 bullet-point style observations

# Format:
# {{
#   "possible_causes": "...",
#   "health_recommendation": "...",
#   "insights": [
#     "...",
#     "...",
#     "..."
#   ]
# }}

# Be concise, clear, and professional.

# Historical data: {json.dumps(pollutant_history, indent=2)}
# """


    headers = {
        "Authorization": f"Bearer {HUGGINGFACE_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "inputs": prompt,
        "parameters": {"max_new_tokens": 1024}
    }

    response = requests.post(API_URL, headers=headers, json=payload)

    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch insights", "details": response.text}), 500

    try:
        # Attempt to extract the model's generated JSON
        model_output = response.json()
        text_response = model_output[0]["generated_text"].split("```json")[-1].split("```")[0].strip()

        parsed_json = json.loads(text_response)
        return jsonify(parsed_json)

    except Exception as e:
        return jsonify({
            "error": "Failed to parse model output",
            "raw_output": response.text,
            "exception": str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)
