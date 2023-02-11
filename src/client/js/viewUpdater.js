async function updateView(date) {
  const request = await fetch("http://localhost:8080/travelResult");
  try {
    const data = await request.json();
    console.log(data);
    // TODO refactor
    // TODO hide result container initially
    // TODO add styling
    const imageFragment = document.createDocumentFragment();
    const image = document.createElement("img");
    image.src = data.imageUrl;
    imageFragment.appendChild(image);
    const infoFragment = document.createDocumentFragment();
    const destinationInfo = document.createElement("p");
    destinationInfo.textContent = `Your Destination: ${data.geoData.cityName}, ${data.geoData.countryName}`;
    infoFragment.appendChild(destinationInfo);
    const dateInfo = document.createElement("p");
    dateInfo.textContent = `Your Departure: ${date}`;
    infoFragment.appendChild(destinationInfo);
    const weatherFragment = document.createDocumentFragment();
    const weatherInfo = document.createElement("p");
    weatherInfo.textContent = "Your Weather Forecast:";
    weatherFragment.appendChild(weatherInfo);
    for (const weatherEntry of data.weather) {
      const forecastDate = document.createElement("p");
      forecastDate.textContent = `Forecast for ${weatherEntry.date}:`;
      const forecastTemperature = document.createElement("p");
      forecastTemperature.textContent = `Temperature: ${weatherEntry.temp} °C`;
      const forecastDescription = document.createElement("p");
      forecastDescription.textContent = `Description: ${weatherEntry.desc}`;
      weatherFragment.appendChild(forecastDate);
      weatherFragment.appendChild(forecastTemperature);
      weatherFragment.appendChild(forecastDescription);
    }
    infoFragment.appendChild(weatherFragment);
    const imageContainer = document.getElementById("image-container");
    const infoContainer = document.getElementById("info-container");
    imageContainer.appendChild(imageFragment);
    infoContainer.appendChild(infoFragment);
  } catch (error) {
    console.log("error", error);
  }
}

export { updateView };
