const checkInput = require("../js/inputChecker");
import { transformLocation } from "./locationTransformer";
import { loadWeatherData } from "./weatherDataLoader";
import { loadImage } from "./imageLoader";
import { updateView } from "./viewUpdater";

async function handleSubmit(event) {
  event.preventDefault();
  resetView();
  const location = document.getElementById("input-location").value;
  const dateOfDeparture = document.getElementById("input-date").value;
  const dateOfReturn = document.getElementById("input-return-date").value;
  if (checkInput(location, dateOfDeparture, dateOfReturn)) {
    transformLocation({ data: location })
      .then((data) =>
        loadWeatherData({
          lat: data.lat,
          lng: data.lng,
          date: dateOfDeparture,
        })
      )
      .then(() => loadImage(location))
      .then(() => updateView(dateOfDeparture, dateOfReturn));
  } else {
    alert("Please add valid input data");
  }
}

function resetView() {
  const imageContainer = document.getElementById("image-container");
  const infoContainer = document.getElementById("info-container");
  // solution taken from https://stackoverflow.com/a/3955238
  while (imageContainer.firstChild) {
    imageContainer.removeChild(imageContainer.lastChild);
  }
  while (infoContainer.firstChild) {
    infoContainer.removeChild(infoContainer.lastChild);
  }
  document.getElementById("result-wrapper").style.display = "none";
}

export { handleSubmit };
