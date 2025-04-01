"use client";

import SearchBar from "@components/SearchBar";
import MainAqiCard from "@components/MainAqiCard";
import { useState } from "react";

import React from "react";
import AQIScale from "@components/AQIScale";
import { FaCircleInfo } from "react-icons/fa6";
import ForecastCarousel from "@components/ForecastCarousel";
import { forecastData } from "@models/forecastData";
import { aiInsights } from "@models/aiInsights";
import { newsArticles } from "@models/newsArticles";
import { calculateAQIInfo } from "@utils/calculateAQIInfo";
import NewsCard from "@components/NewsCard";
import WarningCard from "@components/WarningCard";
import AirQualityChart from "@components/AirQualityChart";
import AQIForecastGraph from "@components/AQIForecastGraph";
import { WHO_LIMITS } from "@models/WHO_LIMITS";
import { getColorClass } from "@utils/getColorClass";
import { formatUnixDate } from "@utils/formatUnixDate";
import { getSeverityStyles } from "@/utils/getSeverityStyles";

const page = () => {
  const [showPollutants, setShowPollutants] = useState(false);
  const [searchedLocation, setSearchedLocation] = useState("");
  const [coords, setCoords] = useState(null);
  const [currentPollutants, setCurrentPollutants] = useState(null);
  const [currentWeather, setCurrentWeather] = useState([]);
  // const currentPollutants = {
  //   coord: {
  //     lon: -79.3839,
  //     lat: 43.6535,
  //   },
  //   list: [
  //     {
  //       main: {
  //         aqi: 2,
  //       },
  //       components: {
  //         co: 290.39,
  //         no: 0.66,
  //         no2: 11.65,
  //         o3: 73.67,
  //         so2: 4.71,
  //         pm2_5: 1.39,
  //         pm10: 2.45,
  //         nh3: 2.15,
  //       },
  //       dt: 1742937300,
  //     },
  //   ],
  // };
  // const currentWeather = {
  //   coord: {
  //     lon: 7.367,
  //     lat: 45.133,
  //   },
  //   weather: [
  //     {
  //       id: 501,
  //       main: "Rain",
  //       description: "moderate rain",
  //       icon: "10d",
  //     },
  //   ],
  //   base: "stations",
  //   main: {
  //     temp: 284.2,
  //     feels_like: 282.93,
  //     temp_min: 283.06,
  //     temp_max: 286.82,
  //     pressure: 1021,
  //     humidity: 60,
  //     sea_level: 1021,
  //     grnd_level: 910,
  //   },
  //   visibility: 10000,
  //   wind: {
  //     speed: 4.09,
  //     deg: 121,
  //     gust: 3.47,
  //   },
  //   rain: {
  //     "1h": 2.73,
  //   },
  //   clouds: {
  //     all: 83,
  //   },
  //   dt: 1726660758,
  //   sys: {
  //     type: 1,
  //     id: 6736,
  //     country: "IT",
  //     sunrise: 1726636384,
  //     sunset: 1726680975,
  //   },
  //   timezone: 7200,
  //   id: 3165523,
  //   name: "Province of Turin",
  //   cod: 200,
  // };

  const aqiInfo = calculateAQIInfo(currentPollutants);
  const [historicalPollutants, setHistoricalPollutants] = useState([]);

  const handleSearch = async (location) => {
    setSearchedLocation(location);
    try {
      // Step 1: Get coordinates using OpenWeather Geocoding
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          location
        )}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      );
      const geoData = await geoResponse.json();

      if (!geoData.length) {
        alert("Location not found, check spelling currently");
        return;
      }

      const { lat, lon, name } = geoData[0];
      setCoords({ lat, lon, name });

      // Step 2: Fetch current air pollution data
      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      );
      const currentData = await currentResponse.json();
      setCurrentPollutants(currentData);
      console.log("✅ Current pollutants:", currentData);

      // Step 3: Fetch historical air pollution data (last 5 days)
      const now = new Date();
      const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);
      const start = Math.floor(fiveDaysAgo.getTime() / 1000); // Unix timestamp (s)
      const end = Math.floor(now.getTime() / 1000);

      const historicalResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lon}&start=${start}&end=${end}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      );
      const historicalData = await historicalResponse.json();
      setHistoricalPollutants(historicalData);
      console.log("📈 Historical pollutants:", historicalData);

      // Step 4: Fetch current weather (temperature, wind, humidity) metrics
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
      );
      const weatherData = await weatherResponse.json();
      setCurrentWeather(weatherData);
      console.log("☁️ Current weather:", weatherData);
    } catch (error) {
      console.error("Error in geocode or pollutant data fetch:", error);
    }
  };

  // const info = calculateAQIInfo(currentPollutants);

  const mainPollutant = aqiInfo?.mainPollutant;
  const components = currentPollutants?.list?.[0]?.components || {};

  /* Build dynamic pollutant cards */
  const otherPollutants = Object?.entries(components)
    .filter(([key]) => key !== mainPollutant)
    .sort(([, a], [, b]) => b - a) // sort descending
    .slice(0, 6) // only top 6
    .map(([key, value]) => {
      const limit = WHO_LIMITS[key] || 100;
      const color = getColorClass(value, limit);

      return {
        name: key.toUpperCase(),
        value,
        limit,
        color,
      };
    });

  const dataFetched = formatUnixDate(currentPollutants?.list?.[0]?.dt);

  // Calculate how many times main pollutant is over WHO's limit

  // 1. Get raw value from mainConcentration string like "73.67 µg/m³"
  const concentrationValue = parseFloat(aqiInfo?.mainConcentration);

  // 2. Get WHO guideline for this pollutant
  const pollutantKey = aqiInfo?.mainPollutant.toLowerCase();
  const whoLimit = WHO_LIMITS[pollutantKey];

  // Get value
  const ratio = whoLimit ? concentrationValue / whoLimit : null;
  const pollutantLimitLevel = ratio?.toFixed(1);

  // Get severity styles for WHO card
  const severityStyles = getSeverityStyles(ratio);

  return (
    <div>
      {/* {Search Bar} */}
      <section className="centered-section search-bar">
        <SearchBar onSearch={handleSearch} />
      </section>

      {/* {cta} */}
      <section className="centered-section cta mt-10">
        <h2 className="font-primary text-2xl font-bold text-gray-800">
          Air Quality Insights
        </h2>
        <p className="font-secondary text-gray-600">
          Air quality index (AQI⁺) and PM2.5 air pollution in{" "}
          {searchedLocation || "Peterborough"} • Last updated by 00:00,{" "}
          {dataFetched || "Feb 26"}
        </p>
      </section>

      {/* {Main AQI Card} */}
      <section className="centered-section main-aqi-card">
        <MainAqiCard
          currentPollutants={currentPollutants}
          currentWeather={currentWeather}
        />
      </section>

      {/* {View all polutants} */}
      <section className="centered-section view-all-pollutants mt-5">
        {/* Toggle Button */}
        <button
          onClick={() => setShowPollutants(!showPollutants)}
          className="text-sm text-gray-700 underline flex italic items-center mx-auto"
        >
          View all pollutant levels {showPollutants ? "▲" : "▼"}
        </button>

        {/* Pollutant Levels - Conditionally Rendered */}
        {showPollutants && (
          <div className="mt-4 bg-green-50 p-6 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {otherPollutants.length > 0 ? (
                otherPollutants.map((pollutant, index) => (
                  <div
                    key={index}
                    className={`${pollutant.color} text-black p-4 rounded-lg shadow-lg`}
                  >
                    <p className="font-semibold font-secondary">
                      {pollutant.name}
                    </p>
                    <p className="text-2xl font-secondary font-bold">
                      {pollutant.value} µg/m³
                    </p>
                    <p className="text-sm">
                      WHO limit: {pollutant.limit} µg/m³
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600">
                  No other pollutants were found.
                </p>
              )}
            </div>
          </div>
        )}
      </section>

      {/* {good-o-meter scale here} */}
      <section className="centered-section good-o-meter">
        <AQIScale aqi={aqiInfo?.aqi} />
      </section>

      <section className="centered-section historical-pollutants mt-5">
        <WarningCard
          city={searchedLocation || "Location"}
          multiple={pollutantLimitLevel || "x.xx"}
          mainPollutant={aqiInfo?.mainPollutant || "XXX"}
          severity={ratio || "x.xx"}
        />
      </section>

      <section className="centered-section mt-15">
        <h2 className="text-2xl font-bold text-gray-800">
          Historical Air Quality Data
        </h2>
        <p className="font-secondary text-gray-600">
          Select a pollutant to view historical trends.
        </p>
        <AirQualityChart />
      </section>

      <section className="centered-section aqi-forecast mt-15">
        <h2 className="font-primary text-xl font-bold text-gray-800">
          Daily AQI Forecast
        </h2>
        <p className="font-secondary text-gray-600">
          Air Quality Index Forecast for Peterborough{" "}
          <span className="underline italic inline-flex items-center space-x-1">
            <span>Powered by Statistical Modelling</span>
            <FaCircleInfo />
          </span>
        </p>

        <ForecastCarousel forecastData={forecastData} />

        <div className="graphs">
          <AQIForecastGraph />
        </div>

        <div className="disclaimers font-secondary text-gray-500">
          <p className="font-bold">
            Our model achieves an accuracy of 82% based on past performance. 
          </p>
          <p className="font-regular mt-5">
            <strong>Disclaimer:</strong> Air quality can be affected by sudden
            events (e.g., wildfires, traffic surges, industrial activities).
            While our model accounts for trends, unexpected changes may impact
            forecast accuracy. 
          </p>
        </div>
      </section>

      <section className="centered-section ai-powered-insights mt-15">
        {/* Title with Gradient */}
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 via-gray-400 to-purple-700 text-transparent bg-clip-text">
          AI-Powered <span className="font-normal">Air Quality Insights</span>
        </h2>

        {/* Description */}
        <p className="font-secondary text-gray-600">
          Smart insights based on pollutant levels to help you breathe safer
          air.
        </p>

        {/* Insights List */}
        <div className="mt-6">
          <ul className=" text-justify list-disc list-inside space-y-2 text-gray-900">
            {Object.values(aiInsights).map((insight, index) => (
              <li key={index} className="p-2">
                {insight}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="centered-section more-resources mt-15 mb-20">
        <h2 className="font-primary text-2xl font-bold text-gray-800">
          Learn More About Air Pollution
        </h2>
        <p className="font-secondary text-gray-600">
          🌍 Explore expert insights, research, and real-world impacts of air
          pollution.
        </p>

        <div className="mt-5">
          {/* News Cards List */}
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide mt-6">
            {newsArticles.map((news, index) => (
              <NewsCard
                key={index}
                title={news.title}
                author={news.author}
                url={news.url}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="centered-section text-gray-600">
        Built with love ❤️ by{" "}
        <span className="italic font-bold underline">David</span> and{" "}
        <span className="italic font-bold underline">Desmond</span>
      </section>
    </div>
  );
};

export default page;
