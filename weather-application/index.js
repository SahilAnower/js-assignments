// todo: showcase weather details for a chosen location - temperature, humidity, weather description

// todo: display a forecast for upcoming days

const weatherApiKey = "800d9da25amshc3eb8eb4088b19fp102153jsn5a6f03227cc5";
const weatherApiUrl = "https://open-weather13.p.rapidapi.com";

const unsplashWeatherImageUrl = "https://source.unsplash.com/random/?";

const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const feelsLikeTemperature = document.getElementById("feels-like-temperature");
const minTemperatureElement = document.getElementById("min-temperature");
const maxTemperatureElement = document.getElementById("max-temperature");
const pressureElement = document.getElementById("pressure");
const visibilityElement = document.getElementById("visibility");

searchButton.addEventListener("click", () => {
  const location = locationInput.value.trim();
  if (location) {
    fetchWeather(location);
  }
});

locationInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const location = locationInput.value.trim();
    if (location) {
      fetchWeather(location);
    }
  }
});

const fahrenheitToCelsius = (temp) => {
  return Math.round(((temp - 32) * 5) / 9);
};

async function fetchWeather(location) {
  const url = `${weatherApiUrl}/city/${location}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": weatherApiKey,
      "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (data?.cod != 200) {
      alert(data?.message);
      return;
    }
    const locationName = data?.name;
    const currentTemperatureInCelsius = Math.round(
      fahrenheitToCelsius(data?.main?.temp)
    );
    const weatherDescription = data?.weather[0]?.main;
    const feelsLikeTemperatureInCelsius = Math.round(
      fahrenheitToCelsius(data?.main?.feels_like)
    );
    const minTemperatureInCelsius = Math.round(
      fahrenheitToCelsius(data?.main?.temp_min)
    );
    const maxTemperatureInCelsius = Math.round(
      fahrenheitToCelsius(data?.main?.temp_max)
    );
    const pressure = data?.main?.pressure; // in mb
    const visibility = Number(data?.visibility) / 1000.0;
    const longitude = data?.coord?.lon; // use for forecast
    const latitude = data?.coord?.lat; // use for forecast
    locationElement.textContent = locationName;
    temperatureElement.textContent = `${currentTemperatureInCelsius}°C`;
    descriptionElement.textContent = weatherDescription;
    feelsLikeTemperature.textContent = `${feelsLikeTemperatureInCelsius}°C`;
    minTemperatureElement.textContent = `${minTemperatureInCelsius}°C`;
    maxTemperatureElement.textContent = `${maxTemperatureInCelsius}°C`;
    pressureElement.textContent = `${pressure} mb`;
    visibilityElement.textContent = `${visibility} km`;
    await updateWeatherImage(location);
  } catch (error) {
    console.error(error);
  }
}

async function updateWeatherImage(weather) {
  const url = `${unsplashWeatherImageUrl}${weather}`;
  document.body.style.backgroundImage = `url(${url})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
}
