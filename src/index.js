function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");


  if (cityElement) { cityElement.innerHTML = response.data.city; }
  if (descriptionElement) { descriptionElement.innerHTML = response.data.condition.description; }
  if (temperatureElement) { temperatureElement.innerHTML = Math.round(response.data.temperature.current); }
  if (humidityElement) { humidityElement.innerHTML = `${response.data.temperature.humidity}%`; }
  if (windElement) { windElement.innerHTML = `${Math.round(response.data.wind.speed)} mph`; }

  let date = new Date(response.data.time * 1000);
  if (timeElement) { timeElement.innerHTML = formatDate(date); }

  if (iconElement) {
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-temp-icon"/>`;
  }
}

function searchCity(city) {
  let apiKey = "t3fabb4446203472a1b4b853oa5d0c30";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSearchFormSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function displayForecast() {
  let forecast = document.querySelector("#forecast");
  if (!forecast) return;

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = ""; 

  days.forEach(function (day) {
   
    forecastHtml +=
      ` <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
        <div class="weather-forecast-temps">
          <div class="weather-forecast-temp"><strong>78°</strong></div>
          <div class="weather-forecast-temp">75°</div>
        </div>
      </div>
    `;
  });

  
  forecast.innerHTML = forecastHtml; 
}

let searchFormElement = document.querySelector("#search-form");
if (searchFormElement) {
  searchFormElement.addEventListener("submit", handleSearchFormSubmit);
}


searchCity("Cayman Islands");
displayForecast(); 


 