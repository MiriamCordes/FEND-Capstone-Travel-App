// update view with loaded data
async function updateView(dateOfDeparture, dateOfReturn) {
  const request = await fetch("http://localhost:8080/travelResult");
  try {
    const data = await request.json();
    createViewElementsAndUpdateView(data, dateOfDeparture, dateOfReturn);
  } catch (error) {
    console.log("error", error);
  }
}

function createViewElementsAndUpdateView(
  data = {},
  dateOfDeparture,
  dateOfReturn
) {
  const imageFragment = getImageFragment(data.imageUrl);
  const infoFragment = getInfoFragment(
    data.geoData,
    data.weather,
    dateOfDeparture,
    dateOfReturn
  );
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

function getInfoFragment(
  geoData = {},
  weatherData = {},
  dateOfDeparture,
  dateOfReturn
) {
  const infoFragment = document.createDocumentFragment();
  const destinationInfo = document.createElement("p");
  destinationInfo.innerHTML = `<strong>Your Destination: </strong> ${geoData.cityName}, ${geoData.countryName}`;
  infoFragment.appendChild(destinationInfo);
  const departureInfo = document.createElement("p");
  departureInfo.innerHTML = `<strong>Your Departure:</strong> ${dateOfDeparture}`;
  infoFragment.appendChild(departureInfo);
  const returnInfo = document.createElement("p");
  returnInfo.innerHTML = `<strong>Your Return:</strong> ${dateOfReturn}`;
  infoFragment.appendChild(returnInfo);
  const lengthInfo = document.createElement("p");
  lengthInfo.innerHTML = `<strong>Length Of Your Trip:</strong> ${getLenghtOfTrip(
    dateOfDeparture,
    dateOfReturn
  )} Day(s)`;
  infoFragment.appendChild(lengthInfo);
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

// solution taken from https://stackoverflow.com/a/47181114
function getLenghtOfTrip(dateOfDeparture, dateOfReturn) {
  const diffInMs = new Date(dateOfReturn) - new Date(dateOfDeparture);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return diffInDays;
}

export { updateView };
