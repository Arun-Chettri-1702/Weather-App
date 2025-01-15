document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getButton = document.getElementById("get-weather");
  const cityWeather = document.getElementById("city_weather");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMsg = document.getElementById("error-message");

  const API_KEY = "RANDOM_API_KEY";

  getButton.addEventListener("click", async () => {
    // async for await to wait for server response
    const city = cityInput.value.trim();

    if (!city) return;

    // server request ->
    // 1. it may throw me error --> wrap in try catch
    // 2. it's not an immediate response --> wait ->> await

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
      cityInput.value = "";
    } catch (e) {
      console.log(e);
      ~showsError();
    }
  });

  async function fetchWeatherData(city) {
    //gets the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    // display

    //object destructuring
    const { name, main, weather } = data;
    cityName.textContent = name;
    temperature.textContent = `Temperature : ${main.temp}°C`;
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

    // unlock display
    cityWeather.classList.remove("hidden");
    errorMsg.classList.add("hidden");

    console.log(data);
  }

  function showsError() {
    cityWeather.classList.add("hidden");
    errorMsg.classList.remove("hidden");
  }
});
