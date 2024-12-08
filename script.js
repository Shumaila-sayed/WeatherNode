console.log(1)

async function getWeatherdata(location) {
    const response = await fetch(
	 `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=83AR6KQUJAR9LYXURC8BHD6UV`
      , { mode: 'cors' });
    const weatherData = await response.json();
    console.log(weatherData);
   processData(weatherData)
    
}

//  getWeatherdata('mumbai')                                                                                                                                                                                                              

function processData(weatherData) {
    const newData = {
      condition: weatherData.currentConditions.conditions,
      temperature: weatherData.currentConditions.temp,
      feelsLike: weatherData.currentConditions.feelslike,
      wind: weatherData.currentConditions.windspeed,
      humidity: weatherData.currentConditions.humidity,
      location: weatherData.address.toUpperCase()
     }
console.log(newData)     
}