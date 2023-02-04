async function loadWeatherData(data = {}) {
    const response = await fetch('http://localhost:8080/weatherData/' + data.lat + ';' + data.lng)
    try {
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.log("Error loading weather: ", error);
    }
};

export { loadWeatherData }