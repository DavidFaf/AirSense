"use client";

import SearchBar from "@components/SearchBar";
import MainAqiCard from "@components/MainAqiCard";
import { useEffect, useMemo, useState } from "react";

import React from "react";
import AQIScale from "@components/AQIScale";
import { FaCircleInfo } from "react-icons/fa6";
import ForecastCarousel from "@components/ForecastCarousel";
import { forecastData } from "@models/forecastData";
// import { aiInsights as insights } from "@models/aiInsights";
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
import { transformHistoricalData } from "@utils/transformHistoricalData";
import { fetchPollutionInsights } from "@utils/fetchPollutionInsights";
import airsenseLogo from "@public/images/png/airsense-logo.png";
import { generateMockForecastData } from "@utils/generateMockForecastData";

import Image from "next/image";
import Link from "next/link";

const page = () => {
  const [showPollutants, setShowPollutants] = useState(false);
  const [searchedLocation, setSearchedLocation] = useState("");
  const [coords, setCoords] = useState(null);
    const [currentPollutants, setCurrentPollutants] = useState(null);

//   const currentPollutants = {
//     coord: {
//       lon: -80.2493,
//       lat: 43.5461,
//     },
//     list: [
//       {
//         main: {
//           aqi: 2,
//         },
//         components: {
//           co: 243.66,
//           no: 0,
//           no2: 0.95,
//           o3: 95.84,
//           so2: 0.53,
//           pm2_5: 0.55,
//           pm10: 0.75,
//           nh3: 2.38,
//         },
//         dt: 1743995119,
//       },
//     ],
//   };

  const [currentWeather, setCurrentWeather] = useState([]);

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

  // Function to fetch data from /predict endpoint from flask and console log it

  const aqiInfo = calculateAQIInfo(currentPollutants);
    const [historicalPollutants, setHistoricalPollutants] = useState([]);

  
//   const historicalPollutants = useMemo(() => (
//     {
//         coord: {
//           lon: -80.2493,
//           lat: 43.5461,
//         },
//         list: [
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 290.39,
//               no: 0,
//               no2: 3.68,
//               o3: 97.27,
//               so2: 0.77,
//               pm2_5: 10.37,
//               pm10: 11.21,
//               nh3: 2.44,
//             },
//             dt: 1743134400,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 290.39,
//               no: 0,
//               no2: 3.86,
//               o3: 87.26,
//               so2: 0.68,
//               pm2_5: 6.97,
//               pm10: 7.91,
//               nh3: 6.9,
//             },
//             dt: 1743138000,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 287.06,
//               no: 0,
//               no2: 3.94,
//               o3: 80.82,
//               so2: 0.69,
//               pm2_5: 5.12,
//               pm10: 6.23,
//               nh3: 12.54,
//             },
//             dt: 1743141600,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 293.73,
//               no: 0,
//               no2: 4.84,
//               o3: 72.96,
//               so2: 0.83,
//               pm2_5: 4.5,
//               pm10: 6.08,
//               nh3: 20.01,
//             },
//             dt: 1743145200,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 303.75,
//               no: 0,
//               no2: 6.17,
//               o3: 65.09,
//               so2: 1.04,
//               pm2_5: 4.39,
//               pm10: 6.54,
//               nh3: 27.11,
//             },
//             dt: 1743148800,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 307.08,
//               no: 0,
//               no2: 7.11,
//               o3: 59.37,
//               so2: 1.21,
//               pm2_5: 4.2,
//               pm10: 6.73,
//               nh3: 29.89,
//             },
//             dt: 1743152400,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 307.08,
//               no: 0,
//               no2: 7.28,
//               o3: 55.79,
//               so2: 1.15,
//               pm2_5: 3.71,
//               pm10: 6.33,
//               nh3: 28.37,
//             },
//             dt: 1743156000,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 307.08,
//               no: 0,
//               no2: 7.45,
//               o3: 54.36,
//               so2: 1.21,
//               pm2_5: 3.27,
//               pm10: 5.86,
//               nh3: 24.32,
//             },
//             dt: 1743159600,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 320.43,
//               no: 0.01,
//               no2: 9.42,
//               o3: 53.64,
//               so2: 1.8,
//               pm2_5: 3.22,
//               pm10: 6.15,
//               nh3: 19.51,
//             },
//             dt: 1743163200,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 310.42,
//               no: 0.1,
//               no2: 13.71,
//               o3: 60.8,
//               so2: 7.15,
//               pm2_5: 4.77,
//               pm10: 7.89,
//               nh3: 8.23,
//             },
//             dt: 1743166800,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 347.14,
//               no: 1.15,
//               no2: 30.16,
//               o3: 47.21,
//               so2: 15.5,
//               pm2_5: 8.77,
//               pm10: 12.93,
//               nh3: 4.88,
//             },
//             dt: 1743170400,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 407.22,
//               no: 4.19,
//               no2: 43.18,
//               o3: 37.91,
//               so2: 16.69,
//               pm2_5: 11.96,
//               pm10: 17.2,
//               nh3: 3.01,
//             },
//             dt: 1743174000,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 407.22,
//               no: 4.3,
//               no2: 37.01,
//               o3: 45.78,
//               so2: 10.37,
//               pm2_5: 10.79,
//               pm10: 15.96,
//               nh3: 2.01,
//             },
//             dt: 1743177600,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 367.16,
//               no: 2.96,
//               no2: 22.96,
//               o3: 55.07,
//               so2: 6.26,
//               pm2_5: 8.65,
//               pm10: 13.02,
//               nh3: 1.84,
//             },
//             dt: 1743181200,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 330.45,
//               no: 2.01,
//               no2: 15.77,
//               o3: 62.23,
//               so2: 5.72,
//               pm2_5: 8.31,
//               pm10: 11.79,
//               nh3: 1.85,
//             },
//             dt: 1743184800,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 320.43,
//               no: 1.54,
//               no2: 15.77,
//               o3: 65.8,
//               so2: 6.08,
//               pm2_5: 9.32,
//               pm10: 12.25,
//               nh3: 1.92,
//             },
//             dt: 1743188400,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 330.45,
//               no: 1.66,
//               no2: 19.19,
//               o3: 65.09,
//               so2: 6.74,
//               pm2_5: 10.57,
//               pm10: 13.78,
//               nh3: 2.03,
//             },
//             dt: 1743192000,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 350.48,
//               no: 2.04,
//               no2: 24.68,
//               o3: 60.08,
//               so2: 8.11,
//               pm2_5: 11.1,
//               pm10: 14.72,
//               nh3: 2.12,
//             },
//             dt: 1743195600,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 373.84,
//               no: 0.66,
//               no2: 32.9,
//               o3: 50.78,
//               so2: 9.06,
//               pm2_5: 10.46,
//               pm10: 13.5,
//               nh3: 1.85,
//             },
//             dt: 1743199200,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 393.87,
//               no: 0.16,
//               no2: 37.01,
//               o3: 45.06,
//               so2: 7.75,
//               pm2_5: 9.49,
//               pm10: 11.59,
//               nh3: 1.35,
//             },
//             dt: 1743202800,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 410.56,
//               no: 0.01,
//               no2: 38.04,
//               o3: 42.2,
//               so2: 6.2,
//               pm2_5: 9.01,
//               pm10: 10.56,
//               nh3: 1.14,
//             },
//             dt: 1743206400,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 420.57,
//               no: 0.01,
//               no2: 38.39,
//               o3: 40.05,
//               so2: 5.25,
//               pm2_5: 8.6,
//               pm10: 9.9,
//               nh3: 1.16,
//             },
//             dt: 1743210000,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 420.57,
//               no: 0.01,
//               no2: 38.04,
//               o3: 38.62,
//               so2: 4.77,
//               pm2_5: 8.16,
//               pm10: 9.6,
//               nh3: 1.27,
//             },
//             dt: 1743213600,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 410.56,
//               no: 0,
//               no2: 35.3,
//               o3: 38.62,
//               so2: 4.23,
//               pm2_5: 8.05,
//               pm10: 9.55,
//               nh3: 1.35,
//             },
//             dt: 1743217200,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 397.21,
//               no: 0,
//               no2: 32.56,
//               o3: 38.62,
//               so2: 3.31,
//               pm2_5: 8.29,
//               pm10: 9.95,
//               nh3: 1.41,
//             },
//             dt: 1743220800,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 390.53,
//               no: 0,
//               no2: 30.85,
//               o3: 38.27,
//               so2: 2.59,
//               pm2_5: 8.86,
//               pm10: 10.64,
//               nh3: 1.42,
//             },
//             dt: 1743224400,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 387.19,
//               no: 0,
//               no2: 30.5,
//               o3: 37.91,
//               so2: 2.32,
//               pm2_5: 9.67,
//               pm10: 11.45,
//               nh3: 1.44,
//             },
//             dt: 1743228000,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 387.19,
//               no: 0,
//               no2: 28.45,
//               o3: 40.77,
//               so2: 2.41,
//               pm2_5: 10.91,
//               pm10: 12.39,
//               nh3: 1.5,
//             },
//             dt: 1743231600,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 387.19,
//               no: 0,
//               no2: 28.1,
//               o3: 41.13,
//               so2: 2.53,
//               pm2_5: 11.11,
//               pm10: 12.25,
//               nh3: 1.41,
//             },
//             dt: 1743235200,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 377.18,
//               no: 0,
//               no2: 25.36,
//               o3: 45.78,
//               so2: 2.86,
//               pm2_5: 10.52,
//               pm10: 11.42,
//               nh3: 1.31,
//             },
//             dt: 1743238800,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 357.15,
//               no: 0,
//               no2: 21.93,
//               o3: 51.5,
//               so2: 3.61,
//               pm2_5: 9.26,
//               pm10: 10.03,
//               nh3: 1.35,
//             },
//             dt: 1743242400,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 347.14,
//               no: 0,
//               no2: 20.91,
//               o3: 50.07,
//               so2: 3.76,
//               pm2_5: 8.36,
//               pm10: 9.14,
//               nh3: 1.39,
//             },
//             dt: 1743246000,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 347.14,
//               no: 0.01,
//               no2: 22.62,
//               o3: 45.06,
//               so2: 3.61,
//               pm2_5: 8,
//               pm10: 8.89,
//               nh3: 1.47,
//             },
//             dt: 1743249600,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 360.49,
//               no: 0.12,
//               no2: 26.73,
//               o3: 39.34,
//               so2: 3.67,
//               pm2_5: 7.77,
//               pm10: 8.87,
//               nh3: 1.54,
//             },
//             dt: 1743253200,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 380.52,
//               no: 0.29,
//               no2: 32.9,
//               o3: 36.12,
//               so2: 4.41,
//               pm2_5: 7.75,
//               pm10: 9.01,
//               nh3: 1.54,
//             },
//             dt: 1743256800,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 417.23,
//               no: 0.42,
//               no2: 41.47,
//               o3: 36.48,
//               so2: 5.48,
//               pm2_5: 7.83,
//               pm10: 9.2,
//               nh3: 1.47,
//             },
//             dt: 1743260400,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 433.92,
//               no: 0.53,
//               no2: 43.53,
//               o3: 41.48,
//               so2: 6.2,
//               pm2_5: 6.73,
//               pm10: 8.02,
//               nh3: 1.31,
//             },
//             dt: 1743264000,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 407.22,
//               no: 0.68,
//               no2: 38.39,
//               o3: 47.21,
//               so2: 5.84,
//               pm2_5: 5.28,
//               pm10: 6.51,
//               nh3: 1.22,
//             },
//             dt: 1743267600,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 373.84,
//               no: 0.73,
//               no2: 30.85,
//               o3: 53.64,
//               so2: 5.36,
//               pm2_5: 4.35,
//               pm10: 5.46,
//               nh3: 1.12,
//             },
//             dt: 1743271200,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 347.14,
//               no: 0.78,
//               no2: 23.99,
//               o3: 58.65,
//               so2: 4.47,
//               pm2_5: 3.89,
//               pm10: 4.83,
//               nh3: 1.04,
//             },
//             dt: 1743274800,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 333.79,
//               no: 0.78,
//               no2: 20.91,
//               o3: 60.08,
//               so2: 3.81,
//               pm2_5: 3.57,
//               pm10: 4.44,
//               nh3: 0.99,
//             },
//             dt: 1743278400,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 330.45,
//               no: 0.82,
//               no2: 21.08,
//               o3: 57.94,
//               so2: 4.65,
//               pm2_5: 3.44,
//               pm10: 4.28,
//               nh3: 1.38,
//             },
//             dt: 1743282000,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 330.45,
//               no: 0.37,
//               no2: 21.76,
//               o3: 55.79,
//               so2: 5.84,
//               pm2_5: 3.35,
//               pm10: 4.09,
//               nh3: 1.95,
//             },
//             dt: 1743285600,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 330.45,
//               no: 0.08,
//               no2: 21.42,
//               o3: 57.22,
//               so2: 5.72,
//               pm2_5: 3.25,
//               pm10: 3.91,
//               nh3: 1.92,
//             },
//             dt: 1743289200,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 333.79,
//               no: 0,
//               no2: 20.91,
//               o3: 60.08,
//               so2: 5.36,
//               pm2_5: 3.3,
//               pm10: 3.93,
//               nh3: 1.76,
//             },
//             dt: 1743292800,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 403.88,
//               no: 0,
//               no2: 33.24,
//               o3: 43.99,
//               so2: 3.82,
//               pm2_5: 9.38,
//               pm10: 10.39,
//               nh3: 1.73,
//             },
//             dt: 1743728400,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 407.22,
//               no: 0,
//               no2: 32.22,
//               o3: 42.56,
//               so2: 3.58,
//               pm2_5: 9.17,
//               pm10: 10.14,
//               nh3: 1.84,
//             },
//             dt: 1743732000,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 397.21,
//               no: 0,
//               no2: 29.47,
//               o3: 43.63,
//               so2: 3.43,
//               pm2_5: 9.28,
//               pm10: 10.26,
//               nh3: 1.98,
//             },
//             dt: 1743735600,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 393.87,
//               no: 0,
//               no2: 26.73,
//               o3: 43.63,
//               so2: 2.62,
//               pm2_5: 9.97,
//               pm10: 11.06,
//               nh3: 2.28,
//             },
//             dt: 1743739200,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 393.87,
//               no: 0,
//               no2: 25.02,
//               o3: 42.2,
//               so2: 1.89,
//               pm2_5: 10.87,
//               pm10: 12.02,
//               nh3: 2.6,
//             },
//             dt: 1743742800,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 393.87,
//               no: 0,
//               no2: 22.96,
//               o3: 41.13,
//               so2: 1.39,
//               pm2_5: 12.18,
//               pm10: 13.39,
//               nh3: 2.85,
//             },
//             dt: 1743746400,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 390.53,
//               no: 0,
//               no2: 20.74,
//               o3: 42.2,
//               so2: 2,
//               pm2_5: 13.82,
//               pm10: 15.04,
//               nh3: 3.07,
//             },
//             dt: 1743750000,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 377.18,
//               no: 0,
//               no2: 19.36,
//               o3: 43.63,
//               so2: 2,
//               pm2_5: 14.05,
//               pm10: 15.27,
//               nh3: 3.14,
//             },
//             dt: 1743753600,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 373.84,
//               no: 0,
//               no2: 21.59,
//               o3: 41.13,
//               so2: 1.74,
//               pm2_5: 13.18,
//               pm10: 14.21,
//               nh3: 3.01,
//             },
//             dt: 1743757200,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 373.84,
//               no: 0,
//               no2: 22.28,
//               o3: 41.49,
//               so2: 1.73,
//               pm2_5: 12.16,
//               pm10: 13,
//               nh3: 3.01,
//             },
//             dt: 1743760800,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 363.83,
//               no: 0,
//               no2: 20.91,
//               o3: 43.63,
//               so2: 1.86,
//               pm2_5: 11.32,
//               pm10: 12.18,
//               nh3: 3.23,
//             },
//             dt: 1743764400,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 373.84,
//               no: 0.01,
//               no2: 22.28,
//               o3: 41.13,
//               so2: 2,
//               pm2_5: 11.17,
//               pm10: 12.24,
//               nh3: 3.52,
//             },
//             dt: 1743768000,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 400.54,
//               no: 0.12,
//               no2: 27.08,
//               o3: 36.12,
//               so2: 2.06,
//               pm2_5: 10.94,
//               pm10: 12.1,
//               nh3: 3.45,
//             },
//             dt: 1743771600,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 410.56,
//               no: 0.24,
//               no2: 29.47,
//               o3: 33.62,
//               so2: 2.21,
//               pm2_5: 9.66,
//               pm10: 10.8,
//               nh3: 3.14,
//             },
//             dt: 1743775200,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 403.88,
//               no: 0.24,
//               no2: 32.56,
//               o3: 33.62,
//               so2: 3.01,
//               pm2_5: 8.56,
//               pm10: 9.61,
//               nh3: 2.69,
//             },
//             dt: 1743778800,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 417.23,
//               no: 0.28,
//               no2: 39.07,
//               o3: 37.19,
//               so2: 4.47,
//               pm2_5: 7.77,
//               pm10: 8.77,
//               nh3: 2.09,
//             },
//             dt: 1743782400,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 420.57,
//               no: 0.55,
//               no2: 39.76,
//               o3: 42.2,
//               so2: 4.41,
//               pm2_5: 6.26,
//               pm10: 7.23,
//               nh3: 1.93,
//             },
//             dt: 1743786000,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 390.53,
//               no: 0.85,
//               no2: 33.59,
//               o3: 48.64,
//               so2: 4.23,
//               pm2_5: 4.82,
//               pm10: 5.73,
//               nh3: 1.79,
//             },
//             dt: 1743789600,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 357.15,
//               no: 0.94,
//               no2: 25.71,
//               o3: 55.08,
//               so2: 3.76,
//               pm2_5: 4.02,
//               pm10: 4.81,
//               nh3: 1.71,
//             },
//             dt: 1743793200,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 337.12,
//               no: 0.92,
//               no2: 20.91,
//               o3: 58.65,
//               so2: 3.16,
//               pm2_5: 3.73,
//               pm10: 4.44,
//               nh3: 1.68,
//             },
//             dt: 1743796800,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 330.45,
//               no: 0.78,
//               no2: 19.54,
//               o3: 57.94,
//               so2: 2.92,
//               pm2_5: 3.47,
//               pm10: 4.14,
//               nh3: 1.71,
//             },
//             dt: 1743800400,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 330.45,
//               no: 0.38,
//               no2: 20.56,
//               o3: 55.08,
//               so2: 3.52,
//               pm2_5: 3.35,
//               pm10: 3.97,
//               nh3: 1.98,
//             },
//             dt: 1743804000,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 327.11,
//               no: 0.09,
//               no2: 20.22,
//               o3: 55.08,
//               so2: 4.17,
//               pm2_5: 3.25,
//               pm10: 3.77,
//               nh3: 2.6,
//             },
//             dt: 1743807600,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 327.11,
//               no: 0.01,
//               no2: 18.85,
//               o3: 57.94,
//               so2: 4.29,
//               pm2_5: 3.27,
//               pm10: 3.74,
//               nh3: 2.85,
//             },
//             dt: 1743811200,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 327.11,
//               no: 0,
//               no2: 18.17,
//               o3: 61.51,
//               so2: 4.41,
//               pm2_5: 3.47,
//               pm10: 3.96,
//               nh3: 2.76,
//             },
//             dt: 1743814800,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 327.11,
//               no: 0,
//               no2: 17.31,
//               o3: 65.09,
//               so2: 4.71,
//               pm2_5: 3.65,
//               pm10: 4.19,
//               nh3: 2.91,
//             },
//             dt: 1743818400,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 320.44,
//               no: 0,
//               no2: 15.42,
//               o3: 68.67,
//               so2: 4.59,
//               pm2_5: 3.73,
//               pm10: 4.26,
//               nh3: 3.04,
//             },
//             dt: 1743822000,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 310.42,
//               no: 0,
//               no2: 14.05,
//               o3: 71.53,
//               so2: 4.23,
//               pm2_5: 3.75,
//               pm10: 4.22,
//               nh3: 3.17,
//             },
//             dt: 1743825600,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 307.08,
//               no: 0,
//               no2: 13.2,
//               o3: 72.24,
//               so2: 3.93,
//               pm2_5: 3.64,
//               pm10: 4.09,
//               nh3: 3.52,
//             },
//             dt: 1743829200,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 300.41,
//               no: 0,
//               no2: 12,
//               o3: 72.24,
//               so2: 3.49,
//               pm2_5: 3.19,
//               pm10: 3.61,
//               nh3: 3.8,
//             },
//             dt: 1743832800,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 293.73,
//               no: 0,
//               no2: 10.97,
//               o3: 72.24,
//               so2: 3.31,
//               pm2_5: 3.22,
//               pm10: 3.71,
//               nh3: 4.81,
//             },
//             dt: 1743836400,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 287.06,
//               no: 0,
//               no2: 10.2,
//               o3: 72.24,
//               so2: 3.49,
//               pm2_5: 3.71,
//               pm10: 4.34,
//               nh3: 5.83,
//             },
//             dt: 1743840000,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 287.06,
//               no: 0,
//               no2: 9.85,
//               o3: 71.53,
//               so2: 3.82,
//               pm2_5: 4.62,
//               pm10: 5.33,
//               nh3: 6.33,
//             },
//             dt: 1743843600,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 287.06,
//               no: 0,
//               no2: 9.94,
//               o3: 70.81,
//               so2: 3.87,
//               pm2_5: 5.61,
//               pm10: 6.4,
//               nh3: 5.83,
//             },
//             dt: 1743847200,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 290.39,
//               no: 0,
//               no2: 10.97,
//               o3: 69.38,
//               so2: 3.25,
//               pm2_5: 6.49,
//               pm10: 7.4,
//               nh3: 3.45,
//             },
//             dt: 1743850800,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 307.08,
//               no: 0,
//               no2: 13.37,
//               o3: 66.52,
//               so2: 3.55,
//               pm2_5: 7.42,
//               pm10: 8.49,
//               nh3: 3.36,
//             },
//             dt: 1743854400,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 327.11,
//               no: 0.05,
//               no2: 16.62,
//               o3: 63.66,
//               so2: 3.82,
//               pm2_5: 8.41,
//               pm10: 9.57,
//               nh3: 3.14,
//             },
//             dt: 1743858000,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 343.8,
//               no: 0.2,
//               no2: 20.22,
//               o3: 60.08,
//               so2: 3.1,
//               pm2_5: 8.83,
//               pm10: 10.02,
//               nh3: 2.69,
//             },
//             dt: 1743861600,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 360.49,
//               no: 0.55,
//               no2: 22.96,
//               o3: 55.79,
//               so2: 2.44,
//               pm2_5: 8.97,
//               pm10: 10.13,
//               nh3: 2.72,
//             },
//             dt: 1743865200,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 373.84,
//               no: 1.26,
//               no2: 23.31,
//               o3: 52.93,
//               so2: 2.12,
//               pm2_5: 9.12,
//               pm10: 10.21,
//               nh3: 2.69,
//             },
//             dt: 1743868800,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 377.18,
//               no: 1.36,
//               no2: 22.28,
//               o3: 50.07,
//               so2: 2,
//               pm2_5: 9.41,
//               pm10: 10.43,
//               nh3: 2.6,
//             },
//             dt: 1743872400,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 377.18,
//               no: 1.33,
//               no2: 21.08,
//               o3: 46.49,
//               so2: 1.94,
//               pm2_5: 9.44,
//               pm10: 10.43,
//               nh3: 2.53,
//             },
//             dt: 1743876000,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 377.18,
//               no: 1.63,
//               no2: 19.02,
//               o3: 43.63,
//               so2: 1.83,
//               pm2_5: 9.16,
//               pm10: 10.19,
//               nh3: 2.6,
//             },
//             dt: 1743879600,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 360.49,
//               no: 1.08,
//               no2: 16.28,
//               o3: 42.92,
//               so2: 1.59,
//               pm2_5: 7.38,
//               pm10: 8.33,
//               nh3: 2.47,
//             },
//             dt: 1743883200,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 313.76,
//               no: 0.44,
//               no2: 11.48,
//               o3: 51.5,
//               so2: 1.45,
//               pm2_5: 4.67,
//               pm10: 5.42,
//               nh3: 2.19,
//             },
//             dt: 1743886800,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 280.38,
//               no: 0.21,
//               no2: 7.63,
//               o3: 65.09,
//               so2: 1.33,
//               pm2_5: 3.43,
//               pm10: 4.05,
//               nh3: 1.95,
//             },
//             dt: 1743890400,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 267.03,
//               no: 0.1,
//               no2: 6.77,
//               o3: 71.53,
//               so2: 1.46,
//               pm2_5: 3.08,
//               pm10: 3.75,
//               nh3: 1.96,
//             },
//             dt: 1743894000,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 263.69,
//               no: 0.01,
//               no2: 6.6,
//               o3: 74.39,
//               so2: 1.64,
//               pm2_5: 3.06,
//               pm10: 3.84,
//               nh3: 1.92,
//             },
//             dt: 1743897600,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 257.02,
//               no: 0,
//               no2: 6,
//               o3: 74.39,
//               so2: 1.62,
//               pm2_5: 2.67,
//               pm10: 3.3,
//               nh3: 1.66,
//             },
//             dt: 1743901200,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 247,
//               no: 0,
//               no2: 4.8,
//               o3: 74.39,
//               so2: 1.25,
//               pm2_5: 1.92,
//               pm10: 2.34,
//               nh3: 1.49,
//             },
//             dt: 1743904800,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 240.33,
//               no: 0,
//               no2: 3.86,
//               o3: 72.96,
//               so2: 0.92,
//               pm2_5: 1.52,
//               pm10: 1.8,
//               nh3: 1.35,
//             },
//             dt: 1743908400,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 236.99,
//               no: 0,
//               no2: 3.3,
//               o3: 71.53,
//               so2: 0.75,
//               pm2_5: 1.21,
//               pm10: 1.42,
//               nh3: 1.28,
//             },
//             dt: 1743912000,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 240.33,
//               no: 0,
//               no2: 3.17,
//               o3: 70.81,
//               so2: 0.67,
//               pm2_5: 0.88,
//               pm10: 1.05,
//               nh3: 1.2,
//             },
//             dt: 1743915600,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 240.33,
//               no: 0,
//               no2: 3.04,
//               o3: 70.1,
//               so2: 0.62,
//               pm2_5: 0.7,
//               pm10: 0.84,
//               nh3: 1.19,
//             },
//             dt: 1743919200,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 243.66,
//               no: 0,
//               no2: 3,
//               o3: 67.95,
//               so2: 0.65,
//               pm2_5: 0.66,
//               pm10: 0.78,
//               nh3: 1.17,
//             },
//             dt: 1743922800,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 243.66,
//               no: 0,
//               no2: 3.21,
//               o3: 65.09,
//               so2: 0.72,
//               pm2_5: 0.56,
//               pm10: 0.7,
//               nh3: 1.27,
//             },
//             dt: 1743926400,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 247,
//               no: 0,
//               no2: 3.38,
//               o3: 60.8,
//               so2: 0.83,
//               pm2_5: 0.59,
//               pm10: 0.76,
//               nh3: 1.41,
//             },
//             dt: 1743930000,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 253.68,
//               no: 0,
//               no2: 3.68,
//               o3: 56.51,
//               so2: 1.12,
//               pm2_5: 0.82,
//               pm10: 1.03,
//               nh3: 1.55,
//             },
//             dt: 1743933600,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 263.69,
//               no: 0,
//               no2: 5.01,
//               o3: 51.5,
//               so2: 1.55,
//               pm2_5: 1.46,
//               pm10: 1.73,
//               nh3: 1.6,
//             },
//             dt: 1743937200,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 273.71,
//               no: 0.01,
//               no2: 5.36,
//               o3: 48.64,
//               so2: 1.15,
//               pm2_5: 1.52,
//               pm10: 1.8,
//               nh3: 1.6,
//             },
//             dt: 1743940800,
//           },
//           {
//             main: {
//               aqi: 1,
//             },
//             components: {
//               co: 287.06,
//               no: 0.07,
//               no2: 3.13,
//               o3: 58.65,
//               so2: 0.38,
//               pm2_5: 1.82,
//               pm10: 2.13,
//               nh3: 1.73,
//             },
//             dt: 1743944400,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 290.39,
//               no: 0.15,
//               no2: 2.49,
//               o3: 64.37,
//               so2: 0.35,
//               pm2_5: 2.57,
//               pm10: 2.9,
//               nh3: 1.84,
//             },
//             dt: 1743948000,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 287.06,
//               no: 0.33,
//               no2: 2.87,
//               o3: 62.23,
//               so2: 0.34,
//               pm2_5: 2.76,
//               pm10: 3.06,
//               nh3: 1.85,
//             },
//             dt: 1743951600,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 277.04,
//               no: 0.45,
//               no2: 2.64,
//               o3: 63.66,
//               so2: 0.26,
//               pm2_5: 2.01,
//               pm10: 2.27,
//               nh3: 1.87,
//             },
//             dt: 1743955200,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 263.69,
//               no: 0.37,
//               no2: 1.86,
//               o3: 69.38,
//               so2: 0.24,
//               pm2_5: 1.07,
//               pm10: 1.34,
//               nh3: 2.03,
//             },
//             dt: 1743958800,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 257.02,
//               no: 0.29,
//               no2: 1.5,
//               o3: 77.25,
//               so2: 0.32,
//               pm2_5: 1.04,
//               pm10: 1.33,
//               nh3: 2.22,
//             },
//             dt: 1743962400,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 250.34,
//               no: 0.21,
//               no2: 1.67,
//               o3: 80.11,
//               so2: 0.45,
//               pm2_5: 1.27,
//               pm10: 1.56,
//               nh3: 2.34,
//             },
//             dt: 1743966000,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 247,
//               no: 0.18,
//               no2: 1.78,
//               o3: 80.11,
//               so2: 0.58,
//               pm2_5: 1.32,
//               pm10: 1.6,
//               nh3: 2.38,
//             },
//             dt: 1743969600,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 247,
//               no: 0.1,
//               no2: 1.52,
//               o3: 83.69,
//               so2: 0.57,
//               pm2_5: 1.17,
//               pm10: 1.43,
//               nh3: 2.34,
//             },
//             dt: 1743973200,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 247,
//               no: 0.06,
//               no2: 1.29,
//               o3: 87.98,
//               so2: 0.5,
//               pm2_5: 1,
//               pm10: 1.25,
//               nh3: 2.28,
//             },
//             dt: 1743976800,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 247,
//               no: 0.02,
//               no2: 1.22,
//               o3: 87.98,
//               so2: 0.45,
//               pm2_5: 0.83,
//               pm10: 1.08,
//               nh3: 2.34,
//             },
//             dt: 1743980400,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 247,
//               no: 0,
//               no2: 1.16,
//               o3: 89.41,
//               so2: 0.48,
//               pm2_5: 0.79,
//               pm10: 1.07,
//               nh3: 2.82,
//             },
//             dt: 1743984000,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 250.34,
//               no: 0,
//               no2: 1.06,
//               o3: 94.41,
//               so2: 0.52,
//               pm2_5: 0.81,
//               pm10: 1.06,
//               nh3: 2.66,
//             },
//             dt: 1743987600,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 247,
//               no: 0,
//               no2: 0.98,
//               o3: 95.84,
//               so2: 0.54,
//               pm2_5: 0.7,
//               pm10: 0.91,
//               nh3: 2.44,
//             },
//             dt: 1743991200,
//           },
//           {
//             main: {
//               aqi: 2,
//             },
//             components: {
//               co: 243.66,
//               no: 0,
//               no2: 0.95,
//               o3: 95.84,
//               so2: 0.53,
//               pm2_5: 0.55,
//               pm10: 0.75,
//               nh3: 2.38,
//             },
//             dt: 1743994800,
//           },
//         ],
//       }),[])

  const [forecastData, setForecastData] = useState([]);

  const [openWeatherForecast, setOpenWeatherForecast] = useState([]);
  const [arimaForecast, setArimaForecast] = useState(null);

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

      // Step 3: Fetch historical air pollution data (last 10 days)
      const now = new Date();
      const fiveDaysAgo = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);
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

      // Step 5: Fetch forecast data
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      );
      const forecastData = await forecastResponse.json();
      setOpenWeatherForecast(forecastData);
      console.log("🌦️ Forecast:", forecastData);
    } catch (error) {
      console.error("Error in geocode or pollutant data fetch:", error);
    }
  };

  const info = calculateAQIInfo(currentPollutants);

  
// Handle search with caches  
//   const handleSearch = async (location) => {
//     setSearchedLocation(location);
  
//     const cacheKey = `airsense_${location.toLowerCase().replace(/\s+/g, "_")}`;
//     const cached = localStorage.getItem(cacheKey);
  
//     if (cached) {
//       const parsed = JSON.parse(cached);
//       const isFresh = Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000;
  
//       if (isFresh) {
//         console.log("🧠 Using cached data");
//         const { currentData, historicalData, weatherData, forecastData, coords } = parsed.data;
//         setCoords(coords);
//         setCurrentPollutants(currentData);
//         setHistoricalPollutants(historicalData);
//         setCurrentWeather(weatherData);
//         setOpenWeatherForecast(forecastData);
//         return;
//       }
//     }
  
//     try {
//       // Step 1: Get coordinates using OpenWeather Geocoding
//       const geoResponse = await fetch(
//         `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
//       );
//       const geoData = await geoResponse.json();
  
//       if (!geoData.length) {
//         alert("Location not found, check spelling");
//         return;
//       }
  
//       const { lat, lon, name } = geoData[0];
//       const coords = { lat, lon, name };
//       setCoords(coords);
  
//       // Step 2: Fetch current air pollution data
//       const currentResponse = await fetch(
//         `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
//       );
//       const currentData = await currentResponse.json();
//       setCurrentPollutants(currentData);
  
//       // Step 3: Historical data (last 10 days)
//       const now = new Date();
//       const start = Math.floor(now.getTime() / 1000) - 30 * 24 * 60 * 60;
//       const end = Math.floor(now.getTime() / 1000);
  
//       const historicalResponse = await fetch(
//         `https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lon}&start=${start}&end=${end}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
//       );
//       const historicalData = await historicalResponse.json();
//       setHistoricalPollutants(historicalData);
  
//       // Step 4: Weather data
//       const weatherResponse = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
//       );
//       const weatherData = await weatherResponse.json();
//       setCurrentWeather(weatherData);
  
//       // Step 5: Forecast data
//       const forecastResponse = await fetch(
//         `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
//       );
//       const forecastData = await forecastResponse.json();
//       setOpenWeatherForecast(forecastData);
  
//       // 💾 Cache everything
//       localStorage.setItem(
//         cacheKey,
//         JSON.stringify({
//           timestamp: Date.now(),
//           data: {
//             coords,
//             currentData,
//             historicalData,
//             weatherData,
//             forecastData,
//           },
//         })
//       );
//     } catch (error) {
//       console.error("❌ Error in geocode or pollutant data fetch:", error);
//     }
//   };
  


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

  const historicalData = transformHistoricalData(historicalPollutants);
  // console.log("📈 Historical Data:", historicalData);

  // Function to retrieve data from backend
  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/predict`);

  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // fetchData();

  // Function to post historical data, and current pollutant data to ARIMA model for prediction

  //   const transformedCurrentPollutants = currentPollutants?.list?.[0]
  //     ? {
  //         dt: currentPollutants.list[0].dt,
  //         components: currentPollutants.list[0].components,
  //       }
  //     : null;

  //   const formatHistoricalPollutants = (data) => {
  //     return (
  //       data?.list?.map((entry) => ({
  //         dt: entry.dt,
  //         components: entry.components,
  //       })) || []
  //     );
  //   };

  //   const transformedHistoricalPollutants = formatHistoricalPollutants(




  const [insights, setInsights] = useState(null);
  const [loadingInsigts, setLoadingInsights] = useState(false);


  const mockForecastData = generateMockForecastData(info?.mainAqi || 33);
  const graphData = forecastData.map(item => ({
    day: item.day,
    AQI_OpenWeather: item.sourceType === "openweather" ? item.main.aqi : null,
    AQI_ARIMA: item.sourceType === "arima" ? item.main.aqi : null,
  }));

  
  useEffect(() => {
    const postToBackend = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/forecast`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            historicalPollutants,
          }),
        }
      );

      const result = await response.json();

      if (
        result?.list &&
        Array.isArray(result.list) &&
        result.list.length > 0
      ) {
        setArimaForecast({
          source: "arima",
          coord: result.coord || {},
          list: result.list,
          performance_metrics: result.metrics || {},
        });
        console.log("ARIMA forecast:", result);
      } else {
        console.warn("Invalid ARIMA response:", result);
      }
    };

    const getInsights = async () => {
        setLoadingInsights(true);
        const result = await fetchPollutionInsights(historicalPollutants);
        console.log("Insights",insights)
        setInsights(result);
        setLoadingInsights(false);
      };

    if (
      historicalPollutants &&
      historicalPollutants.list &&
      historicalPollutants.list.length > 0
    ) {
      postToBackend();
      getInsights();
    }
  }, [historicalPollutants]);

  return (
    <div>
      {/* {Search Bar} */}
      <section className="max-w-3xl mx-auto pt-6 px-4 sm:px-6">
      <div className="flex items-center">
          <a className="text-2xl font-semibold font-poppings italic text-[#224b6e] tracking-wide" href="/">
            AirSense
          </a>
          <Image src={airsenseLogo} width={50} height={50} alt="Chef Hat Icon" />
        </div>
      </section>

      <section className="mt-1 search-bar">
        <SearchBar onSearch={handleSearch} />
      </section>

      {/* {cta} */}
      <section className="centered-section cta mt-7">
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
          insights ={insights}
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
        <AirQualityChart historicalData={historicalData} />
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

        {/* <ForecastCarousel forecastData={openWeatherForecast} /> */}
        <ForecastCarousel
          openWeatherForecast={openWeatherForecast}
          arimaForecast={arimaForecast}
        />

        <div className="graphs">
          <AQIForecastGraph
            forecastData={openWeatherForecast}
            arimaForecast={arimaForecast}
          />
        </div>

        <div className="disclaimers font-secondary text-gray-500">
          {/* <p className="font-bold">
            Processing time :{" "}
            {openWeatherForecast?.performance_metrics.processing_time_seconds}
          </p> */}
          <p className="font-bold">
            Our model achieves an accuracy of up to 82% based on past
            performance.
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
  {insights && insights.insights && insights.insights.length > 0 ? (
    <ul className="text-justify list-disc list-inside space-y-2 text-gray-900">
      {insights.insights.map((insight, index) => (
        <li key={index} className="p-2">
          {insight}
        </li>
      ))}
    </ul>
  ) : (
    <div className="mt-5 mb-10">
      <div className="h-64 flex items-center justify-center bg-gray-50 text-gray-500 border border-gray-200 rounded-md">
        No Insights yet
      </div>
    </div>
  )}
</div>

{/* Testing ai insights  */}
{/* <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-lg font-bold mb-2">Air Quality Insights</h2>
      <p><strong>Possible Causes:</strong> {insights?.possible_causes}</p>
      <p><strong>Health Recommendation:</strong> {insights?.health_recommendation}</p>
      <ul className="mt-2 list-disc pl-5">
        {insights?.insights.map((item, i) => (
          <li key={i} className="text-gray-700">{item}</li>
        ))}
      </ul>
    </div> */}

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
