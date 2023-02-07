async function loadWeatherData(data = {}) {
    const dateInSevenDays = new Date();
    dateInSevenDays.setDate(dateInSevenDays.getDate() +7);
    dateInSevenDays.setHours(0, 0, 0, 0);
    let url = "";
    if(new Date(data.date).getTime() <= dateInSevenDays.getTime()) {
        console.log("loading current weather");
        url = 'http://localhost:8080/currentWeather/';
    } else {
        console.log("loading weather forecast");
        url = 'http://localhost:8080/weatherForecast/'
    } 
    const response = await fetch(url + data.lat + ';' + data.lng)
    try {
        const weatherData = await response.json();
       return weatherData;
    } catch (error) {
        console.log("Error loading weather: ", error);
    }
};

export { loadWeatherData }