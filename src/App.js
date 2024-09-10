import React, { useState, useEffect } from "react";
import WeatherToday from "./components/WeatherToday";
import WeatherForecast from "./components/WeatherForecast";
import Footer from "./components/Footer";
import News from "./components/News";
import Header from "./components/Header";
import "./App.css";
import { api } from "./services/api";

const App = () => {
  const [weather, setWeather] = useState({
    city: "Milano",
    description: "clear sky",
    temperature: 25,
    humidity: 60,
    wind_speed: 10,
  });

  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    handleSearch("Milano");
  }, []);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(api("weather", query));
      const data = await response.json();
      setWeather({
        city: data.name,
        description: data.weather[0].description,
        temperature: Math.round(data.main.temp),
        humidity: data.main.humidity,
        wind_speed: Math.round(data.wind.speed),
      });

      const forecastResponse = await fetch(
        api('forecast',query)
      );
      const forecastData = await forecastResponse.json();

      const dailyForecast = forecastData.list
        .filter((item) => item.dt_txt.includes("12:00:00"))
        .map((item) => ({
          date: item.dt_txt,
          day: {
            maxtemp_c: Math.round(item.main.temp_max),
            mintemp_c: Math.round(item.main.temp_min),
            condition: {
              text: item.weather[0].description,
              icon: item.weather[0].icon,
            },
            wind_kph: Math.round(item.wind.speed),
            humidity: item.main.humidity,
          },
          city: forecastData.city.name,
        }));

      setForecast(dailyForecast);
    } catch (error) {
      console.error("Errore nel recupero dei dati meteo:", error);
    }
  };

  return (
    <div className="app">
      <Header handleSearch={handleSearch} />
      <section id="home">
        <WeatherToday handleSearch={handleSearch} weather={weather} />
      </section>
      <section id="weather-forecast">
        <WeatherForecast forecast={forecast} city={weather.city} />
      </section>
      <section id="news">
        <News />
      </section>
      <Footer />
    </div>
  );
};

export default App;
