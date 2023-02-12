async function updateView(date) {
  const request = await fetch("http://localhost:8080/travelResult");
  try {
    const data = await request.json();
    createViewElementsAndUpdateView(data, date);
  } catch (error) {
    console.log("error", error);
  }
}

function createViewElementsAndUpdateView(data = {}, date) {
  const imageFragment = getImageFragment(data.imageUrl);
  const infoFragment = getInfoFragment(data.geoData, data.weather, date);
  const imageContainer = document.getElementById("image-container");
  const infoContainer = document.getElementById("info-container");
  imageContainer.appendChild(imageFragment);
  infoContainer.appendChild(infoFragment);
  document.getElementById("result-wrapper").style.display = "block";
}

function getImageFragment(imageUrl = "") {
  const imageFragment = document.createDocumentFragment();
  const image = document.createElement("img");
  image.src = imageUrl;
  imageFragment.appendChild(image);
  return imageFragment;
}

function getInfoFragment(geoData = {}, weatherData = {}, date) {
  const infoFragment = document.createDocumentFragment();
  const destinationInfo = document.createElement("p");
  destinationInfo.innerHTML = `<strong>Your Destination: </strong> ${geoData.cityName}, ${geoData.countryName}`;
  infoFragment.appendChild(destinationInfo);
  const dateInfo = document.createElement("p");
  dateInfo.innerHTML = `<strong>Your Departure:</strong> ${date}`;
  infoFragment.appendChild(dateInfo);
  const weatherFragment = getWeatherFragment(weatherData);
  infoFragment.appendChild(weatherFragment);
  return infoFragment;
}

function getWeatherFragment(weatherData = {}) {
  const weatherFragment = document.createDocumentFragment();
  const weatherInfo = document.createElement("p");
  weatherInfo.innerHTML = "<strong>Your Weather Forecast:</strong>";
  weatherFragment.appendChild(weatherInfo);
  for (const weatherEntry of weatherData) {
    const forecastDate = document.createElement("p");
    forecastDate.innerHTML = `<strong>Forecast for </strong> ${weatherEntry.date}`;
    const forecastTemperature = document.createElement("p");
    forecastTemperature.innerHTML = `<strong>Temperature: </strong> ${weatherEntry.temp} °C`;
    const forecastDescription = document.createElement("p");
    forecastDescription.innerHTML = `<strong>Description: </strong> ${weatherEntry.desc}`;
    weatherFragment.appendChild(forecastDate);
    weatherFragment.appendChild(forecastTemperature);
    weatherFragment.appendChild(forecastDescription);
  }
  return weatherFragment;
}

export { updateView };
