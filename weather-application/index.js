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
const timeStampElement = document.getElementById("timestamp");
const forecastContainer = document.getElementById(
  "weather-info__weather-forecast"
);
const weatherDescriptionElement = document.getElementById(
  "weather-description-image"
);
const switchElement = document.getElementById("switch-temp");
const fahrenheitScaleElement = document.getElementById("fahrenheit-scale");
const celsiusScaleElement = document.getElementById("celsius-scale");

switchElement.addEventListener("click", () => {
  const forecastCard = Array.from(
    document.querySelectorAll(".weather-forecast__card")
  );
  // for (const forecast of forecastCard) {
  //   console.log(forecast.querySelector("p:nth-of-type(2)"));
  // }
  // console.log(forecastCard, temperatureParagraph);
  if (fahrenheitScaleElement.classList.contains("temp-scale-active")) {
    fahrenheitScaleElement.classList.remove("temp-scale-active");
    celsiusScaleElement.classList.add("temp-scale-active");
    // convert all temperatures to celsius
    for (const forecast of forecastCard) {
      const temperatureParagraph = forecast.querySelector("p:nth-of-type(2)");
      const temperature = temperatureParagraph.textContent;
      // console.log(temperature);
      let tempMin = convertFahrenheitToCelsius(
        +temperature.split("|")[0].split("°")[0]
      );
      let tempMax = convertFahrenheitToCelsius(
        +temperature.split("|")[1].split("°")[0]
      );
      // console.log(tempMin, tempMax);
      temperatureParagraph.textContent = `${tempMin}°C | ${tempMax}°C`;
    }
    temperatureElement.textContent = convertFahrenheitToCelsius(
      +temperatureElement.textContent
    );
    feelsLikeTemperature.textContent =
      convertFahrenheitToCelsius(
        +feelsLikeTemperature.textContent.split("°")[0]
      ) + "°C";
    minTemperatureElement.textContent =
      convertFahrenheitToCelsius(
        +minTemperatureElement.textContent.split("°")[0]
      ) + "°C";
    maxTemperatureElement.textContent =
      convertFahrenheitToCelsius(
        +maxTemperatureElement.textContent.split("°")[0]
      ) + "°C";
  } else {
    fahrenheitScaleElement.classList.add("temp-scale-active");
    celsiusScaleElement.classList.remove("temp-scale-active");
    // convert all temperatures to fahrenheits
    for (const forecast of forecastCard) {
      const temperatureParagraph = forecast.querySelector("p:nth-of-type(2)");
      const temperature = temperatureParagraph.textContent;
      // console.log(temperature);
      let tempMin = convertCelsiusToFahrenheit(
        +temperature.split("|")[0].split("°")[0]
      );
      let tempMax = convertCelsiusToFahrenheit(
        +temperature.split("|")[1].split("°")[0]
      );
      // console.log(tempMin, tempMax);
      temperatureParagraph.textContent = `${tempMin}°F | ${tempMax}°F`;
    }
    temperatureElement.textContent = convertCelsiusToFahrenheit(
      +temperatureElement.textContent
    );
    feelsLikeTemperature.textContent =
      convertCelsiusToFahrenheit(
        +feelsLikeTemperature.textContent.split("°")[0]
      ) + "°F";
    minTemperatureElement.textContent =
      convertCelsiusToFahrenheit(
        +minTemperatureElement.textContent.split("°")[0]
      ) + "°F";
    maxTemperatureElement.textContent =
      convertCelsiusToFahrenheit(
        +maxTemperatureElement.textContent.split("°")[0]
      ) + "°F";
  }
});

const loadingElement = document.getElementById("loading");

let lastInputValue = null;

searchButton.addEventListener("click", async () => {
  showLoading();
  const location = locationInput.value.trim();
  if (location && location !== lastInputValue) {
    if (lastInputValue !== null) {
      document
        .getElementById("main-search-result-container")
        .classList.add("hidden");
    }
    await fetchWeather(location);
    await getFiveDaysWeatherForecast(location);
    if (fahrenheitScaleElement.classList.contains("temp-scale-active")) {
      fahrenheitScaleElement.classList.remove("temp-scale-active");
      celsiusScaleElement.classList.add("temp-scale-active");
    }
    document
      .getElementById("main-search-result-container")
      .classList.remove("hidden");
    lastInputValue = location;
  }
  hideLoading();
});

locationInput.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    showLoading();
    const location = locationInput.value.trim();
    if (location && location !== lastInputValue) {
      if (lastInputValue !== null) {
        document
          .getElementById("main-search-result-container")
          .classList.add("hidden");
      }
      await fetchWeather(location);
      await getFiveDaysWeatherForecast(location);
      if (fahrenheitScaleElement.classList.contains("temp-scale-active")) {
        fahrenheitScaleElement.classList.remove("temp-scale-active");
        celsiusScaleElement.classList.add("temp-scale-active");
      }
      document
        .getElementById("main-search-result-container")
        .classList.remove("hidden");
      lastInputValue = location;
    }
    hideLoading();
  }
});

function showLoading() {
  loadingElement.classList.remove("hidden");
}

// Function to hide loading spinner or message
function hideLoading() {
  loadingElement.classList.add("hidden");
}

const kelvinToCelsius = (temp) => {
  return Math.round(temp - 273.15);
};

async function fetchWeather(location) {
  // fetch weather details for a particular location
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
    const timestamp = new Date(Number(data?.dt) * 1000).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    );
    locationElement.textContent = locationName;
    temperatureElement.textContent = `${currentTemperatureInCelsius}`;
    descriptionElement.textContent = weatherDescription;
    feelsLikeTemperature.textContent = `${feelsLikeTemperatureInCelsius}°C`;
    minTemperatureElement.textContent = `${minTemperatureInCelsius}°C`;
    maxTemperatureElement.textContent = `${maxTemperatureInCelsius}°C`;
    pressureElement.textContent = `${pressure} mb`;
    visibilityElement.textContent = `${visibility} km`;
    timeStampElement.textContent = `${timestamp}`;
    await updateWeatherImage(location, weatherDescription);
  } catch (error) {
    console.error(error);
  }
}

function convertCelsiusToFahrenheit(temp) {
  return Math.round((temp * 9) / 5 + 32);
}

function convertFahrenheitToCelsius(temp) {
  return Math.round(((temp - 32) * 5) / 9);
}

async function updateWeatherImage(location, weatherDescription) {
  // changing background image according to location
  const url = `${unsplashWeatherImageUrl}${location}`;
  document.body.style.backgroundImage = `url(${url})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
  // changing container image according to weather description
  const url2 = `${unsplashWeatherImageUrl}${weatherDescription}`;
  weatherDescriptionElement.style.backgroundImage = `url(${url2})`;
  weatherDescriptionElement.style.backgroundSize = "cover";
  weatherDescriptionElement.style.backgroundPosition = "center";
  weatherDescriptionElement.style.backgroundRepeat = "no-repeat";
}

async function getFiveDaysWeatherForecast(location) {
  // fetch 5 days weather details for the location
  const url = `${weatherApiUrl}/forecast?q=${location}&appid=${weatherApiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data?.cod != 200) {
      alert(data?.message);
      return;
    }
    document
      .querySelectorAll(".forecast-header")
      .forEach((h) => h.classList.remove("hidden"));
    forecastContainer.innerHTML = "";
    const total = data?.cnt;
    const eachDaySize = total / 5;
    for (let i = 0; i < total; i += eachDaySize) {
      let sumHighTemp = 0;
      let sumLowTemp = 0;
      let avgHighTemp = 0;
      let avgLowTemp = 0;
      let date = data?.list[i]?.dt_txt.split(" ")[0];
      for (let j = i; j < i + eachDaySize; j++) {
        sumHighTemp += Number(data?.list[i]?.main?.temp_max);
        sumLowTemp += Number(data?.list[i]?.main?.temp_min);
      }
      avgHighTemp = kelvinToCelsius(sumHighTemp / eachDaySize);
      avgLowTemp = kelvinToCelsius(sumLowTemp / eachDaySize);
      const newDiv = document.createElement("div");
      newDiv.classList.add("weather-forecast__card");
      newDiv.innerHTML = `
        <p>${date}</p>
        <p>${avgLowTemp}°C | ${avgHighTemp}°C</p>
      `;
      forecastContainer.appendChild(newDiv);
    }
  } catch (error) {
    console.error(error);
  }
}
