# 🌍 AirSense - Real-Time Air Quality Monitoring & Insight Platform

AirSense is a full-stack web application that provides real-time and historical air quality data, forecasted pollutant trends using ARIMA modeling, and AI-generated health insights using a large language model (LLM) hosted on Hugging Face.

## 🔍 Key Features

- **Real-Time Air Quality Data**: Fetches live pollutant concentration levels from the OpenWeather API.
- **Historical Trend Analysis**: Displays pollutant trends for the past 5–10 days.
- **7-Day Forecast (ARIMA)**: Uses time series modeling (ARIMA) to predict air pollutant levels for the upcoming week.
- **AI-Generated Insights (LLM)**:
  - Detects patterns in pollution data.
  - Summarizes likely causes (e.g., industrial emissions).
  - Gives health impact assessments & actionable safety tips.
- **Interactive Frontend**: Built using **Next.js** and **Tailwind CSS**, with smooth visualizations, insights, and alerts.

## 🧠 Tech Stack

### Frontend
- **Next.js**
- **Tailwind CSS**
- **Chart.js / Recharts** (for visualizing forecasts)
- **REST API Calls** to Flask backend

### Backend
- **Flask** (Python)
- **ARIMA (from `statsmodels`)** for pollutant forecasting
- **Hosted Hugging Face Model** (e.g., `Qwen2.5-72B-Instruct`) via `transformers` or REST API for insight generation

### APIs
- **OpenWeather Air Pollution API** for AQI and component pollutants
- **Hugging Face Inference API** for AI insight generation

## ⚙️ How It Works

### 1. Data Flow

```
User → selects location → Frontend fetches data → Backend processes & responds → Frontend displays everything
```

### 2. Forecasting Pipeline (Backend)
- Receives `historicalPollutants` from frontend.
- Applies ARIMA(1,1,1) to each pollutant with sufficient data.
- Returns 7-day forecast with metrics (MAE, MAPE, etc).

### 3. Insight Generation Pipeline
- Sends historical data to hosted LLM (e.g., Qwen2.5-72B) using a strict JSON-based prompt.
- Receives structured output:
```json
{
  "possible_causes": "Vehicular emissions",
  "health_recommendation": "Limit outdoor activities during peak hours.",
  "insights": [
    "PM2.5 levels are rising steadily across the past 3 days.",
    "Ozone spikes are linked to high afternoon temperatures.",
    "CO and NO2 levels remain low, indicating minor traffic flow."
  ]
}
```

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/airsense.git
cd airsense
```

### 2. Setup Backend (Flask)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Add your Hugging Face API key in `.env`:
```
HF_API_KEY=your_huggingface_token_here
```

Run backend:
```bash
flask run
```

### 3. Setup Frontend (Next.js)
```bash
cd frontend
npm install
```

Create `.env.local` file:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

Start frontend:
```bash
npm run dev
```

## 📊 Sample Screenshots

- Forecast Graph with color-coded AQI zones
- Insights Section with clean layout
- Modal for location-based recommendations

![image](https://github.com/user-attachments/assets/fdc7c72e-f5ca-49f1-af52-9b7f9d560c3b)


## 🔐 Environment Variables

| Variable              | Description                             |
|-----------------------|-----------------------------------------|
| `NEXT_PUBLIC_BACKEND_URL` | URL for the Flask backend API           |
| `HF_API_KEY`           | Hugging Face token (for LLM inference) |

## 📦 Dependencies

**Frontend**:
- React / Next.js
- Tailwind CSS
- Chart.js / Recharts

**Backend**:
- Flask
- `statsmodels` (for ARIMA)
- `requests` (for Hugging Face inference)
- `dotenv` (for env management)

## 🙌 Contributions

Feel free to fork this project, open issues, or submit pull requests. Let's improve air quality awareness together!

## 📜 License

MIT License © 2025 David Fafure and Desmond Obinomen
