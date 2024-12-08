const form = document.querySelector('form');
const toggle = document.querySelector('.deg-toggle');

toggle.addEventListener('click', handleToggle);
form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
	e.preventDefault();
  fetchWeather();
}

async function getWeatherdata(location) {
	const response = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=83AR6KQUJAR9LYXURC8BHD6UV`,
		{ mode: 'cors' }
  );
  const error = document.querySelector('.error-msg');
  if (response.status === 400) {
    error.style.display = 'block';
  } else {
    error.style.display = 'none';
    const weatherData = await response.json();
    const newData = processData(weatherData);
    displayData(newData);
  }
}

function processData(weatherData) {
	const newData = {
		condition: weatherData.currentConditions.conditions,
		temperature: weatherData.currentConditions.temp,
		feelsLike: weatherData.currentConditions.feelslike,
		wind: weatherData.currentConditions.windspeed,
		humidity: weatherData.currentConditions.humidity,
		location: weatherData.address.toUpperCase(),
  };
  const celiusBox = document.querySelector('#celius');
  if (celiusBox.style.color === 'black') {
    newData.temperature = Math.round(convertToCelsius(newData.temperature));
    newData.feelsLike = Math.round(convertToCelsius(newData.feelsLike));
  }
  return newData;
}

function displayData(weatherData) {
  document.querySelector('.condition').textContent = weatherData.condition;
  document.querySelector('.location').textContent = weatherData.location;
  document.querySelector('.degrees').textContent = weatherData.temperature;
  document.querySelector('.feels-like').textContent = `FEELS LIKE: ${weatherData.feelsLike}`;
  document.querySelector('.wind').textContent = `WIND: ${weatherData.wind} MPH`;
  document.querySelector('.humidity').textContent = `HUMIDITY: ${weatherData.humidity}%`
}

function fetchWeather() {
	const input = document.querySelector('input');
	const userLocation = input.value;
	getWeatherdata(userLocation);
}

function handleToggle() {
  const farenheitBox = document.querySelector('#farhen');
  const celiusBox = document.querySelector('#celius');
  if (farenheitBox.style.color === 'black') {
    celiusBox.style.backgroundColor = 'rgb(250, 190, 79)';
    celiusBox.style.color = 'black';
    farenheitBox.style.backgroundColor = 'rgba(48, 48, 131, 0.568)';
    farenheitBox.style.color = 'rgb(211, 210, 210)';
  } else {
    farenheitBox.style.backgroundColor = 'rgb(250, 190, 79)';
    farenheitBox.style.color = 'black';
    celiusBox.style.backgroundColor = 'rgba(48, 48, 131, 0.568)';
		celiusBox.style.color = 'rgb(211, 210, 210)';
  }
  fetchWeather()
}

function convertToCelsius(temp) {
  const celius = (temp - 32) * (5 / 9);
  return celius;
}