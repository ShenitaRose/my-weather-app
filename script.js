let now = new Date();

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

document.querySelector(
  "h6"
).innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}, ${year}`;

function celciusToFarenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function setCityName(name) {
  let h2 = document.querySelector("h2");
  if (name) {
    h2.innerHTML = `${name}`;
  } else {
    h2.innerHTML = null;
  }
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  setCityName(searchInput.value);

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
let form = document.querySelector("form");

form.addEventListener("submit", search);

let currentTemperature = 20;
let isShownInFarenheit = false;

let h1 = document.querySelector("h1");

function convert(event) {
  isShownInFarenheit = !isShownInFarenheit;
  if (isShownInFarenheit) {
    h1.innerHTML = `${celciusToFarenheit(currentTemperature)}°F`;
  } else {
    h1.innerHTML = `${currentTemperature}°C`;
  }
}
h1.addEventListener("click", convert);

let apiKey = "9cb245c8974a9aa2bee9c6e33954b52a";
let city = "Paris";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = `${temperature}°C`;
}

axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);

function showPosition(position) {
  let h2 = document.querySelector("h2");
  innerHTML = `${city} + ${temperature}`;
}

function setHumidity(humidity) {
  let humidityTextField = document.querySelector(".humidity");
  humidityTextField.innerHTML = `Humidity: ${humidity}%`;
}

function setWind(windSpeed) {
  let windSpeedTextField = document.querySelector(".wind-speed");
  windSpeedTextField.innerHTML = `Wind: ${windSpeed} mph`;
}

function showLocationTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = `${temperature}°C`;
  setCityName(response.data.name);
  setHumidity(response.data.main.humidity);
  setWind(response.data.wind.speed);
  console.log(response);
}

function onLocationReceived(location) {
  let latitude = location.coords.latitude;
  let longitude = location.coords.longitude;

  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
  let url = `${weatherApi}&appid=${apiKey}`;
  axios.get(url).then(showLocationTemperature);
}

function getCurrentPosition(action) {
  let location = navigator.geolocation.getCurrentPosition(onLocationReceived);
}

let button = document.querySelector(".button-current");
button.addEventListener("click", getCurrentPosition);
