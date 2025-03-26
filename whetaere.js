const apiKey = "9838cd56ba895ffac5e63c76c44bc239";
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city");
const weatherCards = document.getElementById("weather-cards");
async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert(error.message);
  }
}

function displayWeather(data) {
  const { name, weather, main } = data;
  const weatherHTML = `
    <div class="weather-card">
      <h3>${name}</h3>
      <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}" />
      <p>Temperature: ${main.temp}°C</p>
      <p>${weather[0].description}</p>
    </div>
  `;
  weatherCards.innerHTML = weatherHTML;
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    alert("Please enter a city name");
  }
});
