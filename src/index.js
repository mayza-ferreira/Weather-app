let apiKey = `7784a4cd4aa2e0c25ead7bd96d585b8a`;
let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?`;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let now = new Date();
let todayDate = document.querySelector(`#date-today`);
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
todayDate.innerHTML = `${days[now.getDay()]} / ${hours}:${minutes}`;
function handleSubmit(event) {
  event.preventDefault();
  let newCity = document.querySelector(`#form1`).value;
  searchLocation(newCity);
}
function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector(`#forecast`);
  let forecastHTML = ``;
  let forecastDays = response.data.daily;
  forecastDays.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<img
                  src="http://openweathermap.org/img/wn/${
                    day.weather[0].icon
                  }@2x.png"
                  alt=""
                  id="icon-forecast"
                />

                <span id="forecast-day">${formatDate(day.dt)}</span>
                <div class="forecast-temp">
                  <span id="forecast-temp-max">${Math.round(
                    day.temp.max
                  )}°</span>
                  <span id="forecast-temp-min">${Math.round(
                    day.temp.min
                  )}°</span>
                </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function searchLocation(city) {
  let units = "metric";
  let apiUrl = `${apiEndPoint}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function getForecast(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let urlEndPoint = `https://api.openweathermap.org/data/2.5/onecall?`;
  let apiUrl = `${urlEndPoint}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let currentCity = document.querySelector(`#current-city`);

  let temp = document.querySelector(`#current-temp`);
  let descriptionElement = document.querySelector(`#description`);
  let humidityElement = document.querySelector(`#humidity`);
  let windElement = document.querySelector(`#wind`);
  let iconElement = document.querySelector(`#icon-today`);
  temperature = Math.round(response.data.main.temp);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  currentCity.innerHTML = response.data.name;
  temp.innerHTML = `${temperature} `;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;

  iconElement.setAttribute(
    `src`,
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(`alt`, response.data.weather[0].description);

  getForecast(response.data.coord);
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let urlApi = `${apiEndPoint}lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(urlApi).then(displayWeather);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let btnSearch = document.querySelector(`#btn-search`);
btnSearch.addEventListener(`click`, handleSubmit);

let search = document.querySelector(`#form1`);
search.addEventListener(`keyup`, function (event) {
  if (event.keyCode === 13) {
    handleSubmit(event);
  }
});

let btnGeolocation = document.querySelector(`#btn-geo`);
btnGeolocation.addEventListener(`click`, getLocation);

searchLocation(`Lisbon`);
