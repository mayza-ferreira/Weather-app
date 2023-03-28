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
todayDate.innerHTML = `${
  days[now.getDay()]
} / ${now.getHours()}:${now.getMinutes()}`;

function searchLocation(event) {
  event.preventDefault();
  let newCity = document.querySelector(`#form1`);
  let units = "metric";
  let apiUrl = `${apiEndPoint}q=${newCity.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
  console.log(apiUrl);
}

function displayWeather(response) {
  let currentCity = document.querySelector(`#current-city`);
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector(`#current-temp`);
  let descriptionElement = document.querySelector(`#description`);
  let humidityElement = document.querySelector(`#humidity`);
  let windElement = document.querySelector(`#wind`);
  currentCity.innerHTML = response.data.name;
  temp.innerHTML = `${temperature}° `;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
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
