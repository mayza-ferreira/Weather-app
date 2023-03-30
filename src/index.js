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

function searchLocation(event) {
  event.preventDefault();
  let newCity = document.querySelector(`#form1`);
  let units = "metric";
  let apiUrl = `${apiEndPoint}q=${newCity.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  let currentCity = document.querySelector(`#current-city`);
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector(`#current-temp`);
  let descriptionElement = document.querySelector(`#description`);
  let humidityElement = document.querySelector(`#humidity`);
  let windElement = document.querySelector(`#wind`);
  let celsiusElement = document.querySelector(`#celsius`);
  let unitsSeparator = document.querySelector(`#units-separator`);
  let fahrenheitElement = document.querySelector(`#fahrenheit`);
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  currentCity.innerHTML = response.data.name;
  temp.innerHTML = `${temperature}° `;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  celsiusElement.innerHTML = `C`;
  unitsSeparator.innerHTML = `/`;
  fahrenheitElement.innerHTML = `F`;
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
btnSearch.addEventListener(`click`, searchLocation);

let btnGeolocation = document.querySelector(`#btn-geo`);
btnGeolocation.addEventListener(`click`, getLocation);

/*function changeToC(event) {
  event.preventDefault();
  let newTemp = document.querySelector(`#current-temp`);
  newTemp.innerHTML = `26° `;
}
function changeToF(event) {
  event.preventDefault();
  let newTemp = document.querySelector(`#current-temp`);
  newTemp.innerHTML = `79° `;
}

let fahren = document.querySelector(`#fahrenheit`);
fahren.addEventListener(`click`, changeToF);

let celsius = document.querySelector(`#celsius`);
celsius.addEventListener(`click`, changeToC);
*/
