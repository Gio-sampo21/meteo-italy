import React, { useState, useEffect, useCallback, useRef } from "react";
import debounce from "lodash.debounce";
import { api } from "../services/api";
import comuni from "./comuni.json";
import "./WeatherToday.css";

const WeatherToday = ({ weather, handleSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const dropdownRef = useRef(null);

  const fetchSuggestions = async (query) => {
    if (query.length < 3) return;
    try {
      const response = await fetch(api("find", query));
      const data = await response.json();
      const uniqueCities = Array.from(
        new Set(data.list.map((item) => item.name))
      );
      setSuggestions(uniqueCities);
    } catch (error) {
      console.error("Errore nel recupero dei suggerimenti di ricerca:", error);
    }
  };

  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 500),
    []
  );

  useEffect(() => {
    if (query.length > 2) {
      debouncedFetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
  }, [query, debouncedFetchSuggestions]);

  const handleChange = (event) => {
    const query = event.target.value.toLowerCase();
    setQuery(query);
    if (query === "") {
      setSearchResult([]);
      setSuggestions([]);
      return;
    }
    let search = comuni.filter((r) => {
      let nome = r.nome.toLowerCase();
      let wordLength = query.length;
      return nome.substring(0, wordLength) === query;
    });
    setSearchResult(search);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (query) {
      handleSearch(query);
      setQuery("");
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (value) => {
    setQuery(value);
    setSuggestions([]);
    handleSearch(value);
    setSearchResult([]);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 200);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setSearchResult([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getWeatherIcon = (description) => {
    switch (description.toLowerCase()) {
      case "clear sky":
        return "01d";
      case "few clouds":
        return "02d";
      case "scattered clouds":
        return "03d";
      case "broken clouds":
        return "04d";
      case "shower rain":
        return "09d";
      case "rain":
        return "10d";
      case "thunderstorm":
        return "11d";
      case "snow":
        return "13d";
      case "light rain":
        return "10d";
      case "mist":
        return "50d";
      default:
        return "01d";
    }
  };

  const translateDescription = (description) => {
    switch (description.toLowerCase()) {
      case "clear sky":
        return "Cielo sereno";
      case "few clouds":
        return "Poche nuvole";
      case "scattered clouds":
        return "Nuvole sparse";
      case "broken clouds":
        return "Nuvoloso";
      case "shower rain":
        return "Rovesci";
      case "rain":
        return "Pioggia";
      case "thunderstorm":
        return "Temporale";
      case "snow":
        return "Neve";
      case "light rain":
        return "Pioggia leggera";
      case "mist":
        return "Nebbia";
      default:
        return description;
    }
  };

  return (
    <div className="weather-today">
      <h2>Meteo di oggi</h2>
      <div className="search-container">
        <form
          onSubmit={handleSearchSubmit}
          className={`search-form ${isFocused ? "focused" : ""}`}
        >
          <span className="search-icon" role="img" aria-label="search">
            🔍
          </span>
          <input
            type="text"
            placeholder="Cerca la tua località..."
            value={query}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </form>
        {isFocused && suggestions.length > 0 && (
          <div className="suggestions">
            <ul>
              {suggestions.map((item, index) => (
                <li key={index} onClick={() => handleSuggestionClick(item)}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="drop-menu-search" ref={dropdownRef}>
          {query.length > 0 &&
            searchResult.map((r) => (
              <p key={r.nome} onClick={() => handleSuggestionClick(r.nome)}>
                {r.nome}, {r.sigla}, {r.regione.nome}
              </p>
            ))}
        </div>
      </div>

      {weather ? (
        <div className="weather-today-content">
          <h3 className="weather-today-city">{weather.city}</h3>
          <div className="weather-today-main">
            <img
              className="weather-today-icon"
              src={`http://openweathermap.org/img/wn/${getWeatherIcon(
                weather.description
              )}@2x.png`}
              alt={translateDescription(weather.description)}
            />
            <div className="weather-today-info">
              <p className="weather-today-temperature">
                {Math.round(weather.temperature)}°C
              </p>
              <p className="weather-today-description">
                {translateDescription(weather.description)}
              </p>
            </div>
          </div>
          <div className="weather-today-details">
            <p>Umidità: {weather.humidity}%</p>
            <p>Vento: {weather.wind_speed} km/h</p>
          </div>
        </div>
      ) : (
        <p>Inserisci una località per vedere il meteo.</p>
      )}
    </div>
  );
};

export default WeatherToday;
