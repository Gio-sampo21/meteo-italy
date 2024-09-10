import React from "react";
import "./WeatherForecast.css";

// Funzione per caricare dinamicamente le immagini
function importAll(r) {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace("./", "").replace(".jpg", "")] = r(item);
  });
  return images;
}

// Carica tutte le immagini dalla cartella src/images
const images = importAll(require.context("../images", false, /\.(png|jpe?g|svg)$/));

const WeatherForecast = ({ forecast, city }) => {
  const translateCondition = (condition) => {
    const translations = {
      "clear sky": "Cielo sereno",
      "few clouds": "Poche nuvole",
      "scattered clouds": "Nuvole sparse",
      "broken clouds": "Nuvoloso",
      "shower rain": "Pioggia a tratti",
      rain: "Pioggia",
      thunderstorm: "Temporale",
      snow: "Neve",
      mist: "Nebbia",
    };
    return translations[condition.toLowerCase()] || condition;
  };

 
  const cityImageName = city.toLowerCase().replace(/\s+/g, "-");
  const cityImage = images[cityImageName];

  return (
    <div id="weather-forecast" className="weather-forecast">
      <div className="city-info">
        {cityImage && (
          <img src={cityImage} alt={`Vista di ${city}`} className="city-image" />
        )}
        <h2>Previsioni per {city}</h2>
      </div>
      <div className="forecast-container">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-day">
            <div className="forecast-header">
              <img
                src={`http://openweathermap.org/img/wn/${day.day.condition.icon}@2x.png`}
                alt={day.day.condition.text}
                className="forecast-icon"
              />
              <div className="forecast-details">
                <div className="forecast-date">
                  {new Date(day.date).toLocaleDateString("it-IT", {
                    weekday: "long",
                  })}
                </div>
                <div className="forecast-condition">
                  {translateCondition(day.day.condition.text)}
                </div>
              </div>
            </div>
            <div className="forecast-temperatures">
              <div className="max-temp">
                Max: {Math.round(day.day.maxtemp_c)}°C
              </div>
              <div className="min-temp">
                Min: {Math.round(day.day.mintemp_c)}°C
              </div>
            </div>
            <div className="additional-info">
              <div>Vento: {Math.round(day.day.wind_kph)} km/h</div>
              <div>Umidità: {day.day.humidity}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
