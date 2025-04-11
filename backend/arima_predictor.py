# import pandas as pd
# from statsmodels.tsa.arima.model import ARIMA
# import datetime
# import time

# def forecast_pollutants(historical_data, current_data, steps=5):
#     # Extract pollutants list from current_data
#     pollutants = current_data.keys()
#     forecasts = []

#     for pollutant in pollutants:
#         # Extract time series for this pollutant
#         ts = [
#             (entry["dt"], entry["components"].get(pollutant, None))
#             for entry in historical_data
#         ]
#         ts = [(ts_, val) for ts_, val in ts if val is not None]

#         if len(ts) < 5:
#             continue  # not enough data

#         df = pd.DataFrame(ts, columns=["dt", "value"])
#         df["date"] = pd.to_datetime(df["dt"], unit="s")
#         df.set_index("date", inplace=True)
#         df = df.resample("D").mean().interpolate()

#         model = ARIMA(df["value"], order=(2, 1, 2))
#         fitted = model.fit()
#         forecast = fitted.forecast(steps=steps)

#         today = df.index[-1]
#         forecast_dates = [today + datetime.timedelta(days=i+1) for i in range(steps)]
#         forecast_ts = [int(d.timestamp()) for d in forecast_dates]

#         for i in range(steps):
#             if i >= len(forecasts):
#                 forecasts.append({
#                     "dt": forecast_ts[i],
#                     "components": {},
#                     "metrics": {}
#                 })

#             forecasts[i]["components"][pollutant] = round(forecast[i], 2)

#     return forecasts


import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA

def forecast_pollutants(historical, current, n_steps=12):
    print("🔍 Raw historical input length:", len(historical))  # Debug print

    try:
        data = []
        for item in historical:
            dt = item.get("dt")
            components = item.get("components")
            if dt is not None and isinstance(components, dict):
                row = {"datetime": pd.to_datetime(dt, unit="s")}
                row.update(components)
                data.append(row)

        if not data:
            raise ValueError("❌ No valid data points in historical pollutants.")

        df = pd.DataFrame(data)
        print("✅ Parsed DataFrame columns:", df.columns.tolist())  # Debug print
        df.set_index("datetime", inplace=True)

    except Exception as e:
        print("💥 Error while preparing DataFrame:", e)
        raise

    predictions = {}

    try:
        for pollutant in df.columns:
            series = df[pollutant].astype(float)

            if series.nunique() <= 1:
                print(f"⚠️ Skipping '{pollutant}' - Not enough variation in data.")
                continue

            model = ARIMA(series, order=(1, 1, 1))
            model_fit = model.fit()
            forecast = model_fit.forecast(steps=n_steps)

            predictions[pollutant] = forecast.tolist()

    except Exception as e:
        print("💥 Error during ARIMA modeling:", e)
        raise

    return {
        "predicted_pollutants": predictions,
        "input_current_pollutants": current
    }


def forecast_pollutants(historical, current, n_steps=12):
    print("🔍 Raw historical input length:", len(historical))  # Debug print

    try:
        data = []
        for item in historical:
            dt = item.get("dt")
            components = item.get("components")
            if dt is not None and isinstance(components, dict):
                row = {"datetime": pd.to_datetime(dt, unit="s")}
                row.update(components)
                data.append(row)

        if not data:
            raise ValueError("❌ No valid data points in historical pollutants.")

        df = pd.DataFrame(data)
        print("✅ Parsed DataFrame columns:", df.columns.tolist())  # Debug print
        df.set_index("datetime", inplace=True)

    except Exception as e:
        print("💥 Error while preparing DataFrame:", e)
        raise

    predictions = {}

    try:
        for pollutant in df.columns:
            series = df[pollutant].astype(float)

            if series.nunique() <= 1:
                print(f"⚠️ Skipping '{pollutant}' - Not enough variation in data.")
                continue

            model = ARIMA(series, order=(1, 1, 1))
            model_fit = model.fit()
            forecast = model_fit.forecast(steps=n_steps)

            predictions[pollutant] = forecast.tolist()

    except Exception as e:
        print("💥 Error during ARIMA modeling:", e)
        raise

    return {
        "predicted_pollutants": predictions,
        "input_current_pollutants": current
    }
