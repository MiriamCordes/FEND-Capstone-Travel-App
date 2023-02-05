async function loadWeatherData(data = {}) {
    const dateInSevenDays = new Date();
    dateInSevenDays.setDate(dateInSevenDays.getDate() +7);
    dateInSevenDays.setHours(0, 0, 0, 0);
    console.log("date in seven dates: " + dateInSevenDays);
    console.log("selected date: " + data.date);
    if(new Date(data.date).getTime() <= dateInSevenDays.getTime()) {
        console.log("loading current weather");
       return loadCurrentWeather(data.lat, data.lng);
    } else {
        console.log("loading weather forecast");
        return loadWeatherForecast(data.lat, data.lng);
    } 
};

// TODO refactor to use only one function where endpoint is passed 
const loadCurrentWeather = async(lat, lng) => {
    const response = await fetch('http://localhost:8080/currentWeather/' + lat + ';' + lng)
    try {
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.log("Error loading weather: ", error);
    }
}

const loadWeatherForecast = async(lat, lng) => {
    const response = await fetch('http://localhost:8080/weatherForecast/' + lat + ';' + lng)
    try {
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.log("Error loading weather: ", error);
    }
}

export { loadWeatherData }