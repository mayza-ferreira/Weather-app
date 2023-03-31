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

function searchLocation(city) {
  let units = "metric";
  let apiUrl = `${apiEndPoint}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  let currentCity = document.querySelector(`#current-city`);

  let temp = document.querySelector(`#current-temp`);
  let descriptionElement = document.querySelector(`#description`);
  let humidityElement = document.querySelector(`#humidity`);
  let windElement = document.querySelector(`#wind`);
  let celsiusElement = document.querySelector(`#celsius`);
  let unitsSeparator = document.querySelector(`#units-separator`);
  let fahrenheitElement = document.querySelector(`#fahrenheit`);
  let iconElement = document.querySelector(`#icon-today`);
  temperature = Math.round(response.data.main.temp);
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  currentCity.innerHTML = response.data.name;
  temp.innerHTML = `${temperature}° `;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  celsiusElement.innerHTML = `C`;
  unitsSeparator.innerHTML = `|`;
  fahrenheitElement.innerHTML = `F`;
  iconElement.setAttribute(
    `src`,
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(`alt`, response.data.weather[0].description);
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

function displayFharenheitTemp(event) {
  event.preventDefault();
  let fahrenTemp = (temperature * 9) / 5 + 32;
  let temp = document.querySelector(`#current-temp`);
  temp.innerHTML = `${Math.round(fahrenTemp)}° `;
}
function displayCelsiusTemp(event) {
  event.preventDefault();
  let temp = document.querySelector(`#current-temp`);
  temp.innerHTML = `${temperature}° `;
}

let temperature = null;

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

let fahrenheitLink = document.querySelector(`#fahrenheit`);
fahrenheitLink.addEventListener(`click`, displayFharenheitTemp);

let celsiusLink = document.querySelector(`#celsius`);
celsiusLink.addEventListener(`click`, displayCelsiusTemp);

searchLocation(`Lisbon`);
