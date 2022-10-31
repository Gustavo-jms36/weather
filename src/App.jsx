import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [weather, setWeather] = useState({});
  const [isCelcius, setIsCelcius] = useState(true);

  useEffect(() => {
    const success = (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d71c04fbc45579d994833f6fde40287b&units=metric`
        )
        .then((res) => setWeather(res.data));
    };

    navigator.geolocation.getCurrentPosition(success);
  }, []);

  console.log(weather);

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Weather App</h1>

        <div className="location">
          <h2>{`${weather.name}, ${weather.sys?.country}`}</h2>
        </div>
        <section className="weather-info">
          <div className="weather-description">
            <div className="side-left">
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
                alt=""
              />
              <div className="temp-info">
                <div className="weather-temp">
                  <i class="fa-solid fa-temperature-high"></i>
                  <h2>
                    {Math.floor(isCelcius
                      ? weather.main?.temp
                      : weather.main?.temp * (9 / 5) + 32)}{" "}
                    {isCelcius ? "°C" : "°F"}
                  </h2>
                </div>
                <h2>{weather.weather?.[0].description}</h2>
                <button
                  class="pure-button"
                  onClick={() => setIsCelcius(!isCelcius)}
                >
                  {isCelcius ? "°C": "°F"}
                </button>
              </div>
            </div>
            <div className="side-rigth">
              <div className="pronostic">
                <i class="fa-solid fa-temperature-high"></i>

                <h2>
                  <span>Feels like:</span>{" "}
                  {Math.floor(isCelcius
                    ? weather.main?.feels_like
                    : weather.main?.feels_like * (9 / 5) + 32)}{" "}
                  {isCelcius ? "°C" : "°F"}
                </h2>
              </div>

              <div className="pronostic">
                <i class="fa-solid fa-temperature-arrow-down"></i>

                <h2>
                  <span>Temp. Min:</span>{" "}
                  {Math.floor(isCelcius
                    ? weather.main?.temp_min
                    : weather.main?.temp_min * (9 / 5) + 32)}{" "}
                  {isCelcius ? "°C" : "°F"}
                </h2>
              </div>

              <div className="pronostic">
                <i class="fa-solid fa-temperature-arrow-up"></i>

                <h2>
                  <span>Temp. Max:</span>{" "}
                  {Math.floor(isCelcius
                    ? weather.main?.temp_max
                    : weather.main?.temp_max * (9 / 5) + 32)}{" "}
                  {isCelcius ? "°C" : "°F"}
                </h2>
              </div>
            </div>
          </div>
        </section>
        <section className="aditionals">
          <div className="container-info-weather">
            <h2>Coords</h2>
            <i class="fa-solid fa-location-dot"></i>
            <h3>
              <span>Latitude:</span> {weather.coord?.lat}
            </h3>
            <h3>
              <span>Longitude:</span> {weather.coord?.lon}
            </h3>
          </div>

          <div className="container-info-weather">
            <h2>Pressure</h2>
            <i class="fa-solid fa-gauge"></i>
            <h3>{weather.main?.pressure} hPa</h3>
          </div>

          <div className="container-info-weather">
            <h2>Humidity</h2>
            <i class="fa-solid fa-droplet"></i>
            <h3>{weather.main?.humidity}%</h3>
          </div>

          <div className="container-info-weather">
            <h2>Wind</h2>
            <i class="fa-solid fa-wind"></i>
            <h3>
              <span>Speed:</span> {weather.wind?.speed} m/s
            </h3>
            <h3>
              <span>Deg:</span> {weather.wind?.deg} m/s
            </h3>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
