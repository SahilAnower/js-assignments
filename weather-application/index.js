// todo: showcase weather details for a chosen location - temperature, humidity, weather description

// todo: display a forecast for upcoming days

const weatherApiKey = "dff95c718e47360648a8d56ec975d0ee";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5";

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
const forecastContainer = document.getElementById("forecast-append-container");

searchButton.addEventListener("click", () => {
  const location = locationInput.value.trim();
  if (location) {
    fetchWeather(location);
    getFiveDaysWeatherForecast(location);
  }
});

locationInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const location = locationInput.value.trim();
    if (location) {
      fetchWeather(location);
      getFiveDaysWeatherForecast(location);
    }
  }
});

const kelvinToCelsius = (temp) => {
  return Math.round(temp - 273.15);
};

async function fetchWeather(location) {
  const url = `${weatherApiUrl}/weather?q=${location}&appid=${weatherApiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data?.cod != 200) {
      alert(data?.message);
      return;
    }
    const locationName = data?.name;
    const currentTemperatureInCelsius = Math.round(
      kelvinToCelsius(data?.main?.temp)
    );
    const weatherDescription = data?.weather[0]?.main;
    const feelsLikeTemperatureInCelsius = Math.round(
      kelvinToCelsius(data?.main?.feels_like)
    );
    const minTemperatureInCelsius = Math.round(
      kelvinToCelsius(data?.main?.temp_min)
    );
    const maxTemperatureInCelsius = Math.round(
      kelvinToCelsius(data?.main?.temp_max)
    );
    const pressure = data?.main?.pressure; // in mb
    const visibility = Number(data?.visibility) / 1000.0;
    // const longitude = data?.coord?.lon; // use for forecast
    // const latitude = data?.coord?.lat; // use for forecast
    document.querySelectorAll(".extra-property").forEach((div) => {
      div.classList.remove("hidden");
    });
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

async function getFiveDaysWeatherForecast(location) {
  const url = `${weatherApiUrl}/forecast?q=${location}&appid=${weatherApiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data?.cod != 200) {
      alert(data?.message);
      return;
    }
    // console.log(data);
    document
      .querySelectorAll(".forecast-header")
      .forEach((h) => h.classList.remove("hidden"));
    forecastContainer.innerHTML = "";
    const total = data?.cnt;
    const eachDaySize = total / 5;
    for (let i = 0; i < total; i += eachDaySize) {
      let sumTemp = 0;
      let avgTemp = 0;
      let date = data?.list[i]?.dt_txt.split(" ")[0];
      for (let j = i; j < i + eachDaySize; j++) {
        sumTemp += Number(data?.list[i]?.main?.temp);
      }
      avgTemp = kelvinToCelsius(sumTemp / eachDaySize);
      const newDiv = document.createElement("div");
      newDiv.innerHTML = `
        <p>${avgTemp} °C</p>
        <p>${date}</p>
      `;
      forecastContainer.appendChild(newDiv);
    }
  } catch (error) {
    console.error(error);
  }
}
