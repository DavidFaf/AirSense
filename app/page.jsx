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
import NewsCard from "@components/NewsCard";
import WarningCard from "@components/WarningCard";
import AirQualityChart from "@components/AirQualityChart";
import AQIForecastGraph from "@components/AQIForecastGraph";

const page = () => {
  const [showPollutants, setShowPollutants] = useState(false);

  return (
    <div>
      {/* {Search Bar} */}
      <section className="centered-section search-bar">
        <SearchBar />
      </section>

      {/* {cta} */}
      <section className="centered-section cta mt-15">
        <h2 className="font-primary text-2xl font-bold text-gray-800">
          Air Quality Insights
        </h2>
        <p className="font-secondary text-gray-600">
          Air quality index (AQI⁺) and PM2.5 air pollution in Peterborough •
          Last updated by 00:00, Feb 26
        </p>
      </section>

      {/* {Main AQI Card} */}
      <section className="centered-section main-aqi-card">
        <MainAqiCard />
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
              {/* Sample Pollutant Card */}
              {[
                { color: "bg-green-500", level: "12.5" },
                { color: "bg-yellow-400", level: "12.5" },
                { color: "bg-orange-400", level: "12.5" },
                { color: "bg-red-500", level: "12.5" },
                { color: "bg-orange-500", level: "12.5" },
                { color: "bg-red-600", level: "12.5" },
              ].map((pollutant, index) => (
                <div
                  key={index}
                  className={`${pollutant.color} text-black p-4 rounded-lg shadow-lg`}
                >
                  <p className="font-semibold font-secondary">PM2.5</p>
                  <p className="text-2xl font-secondary font-bold">
                    {pollutant.level} µg/m³
                  </p>
                  <p className="text-sm">WHO limit: 40µg/m³</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* {good-o-meter scale here} */}
      <section className="centered-section good-o-meter">
        <AQIScale aqi={20} />
      </section>

      <section className="centered-section historical-pollutants mt-5">
        <WarningCard
          city="Peterborough"
          message="The PM2.5 concentration in Peterborough is currently 1.5 times the World Health Organization annual PM2.5 guideline value."
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
