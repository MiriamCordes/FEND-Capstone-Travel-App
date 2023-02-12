import { checkInput } from "./inputChecker";
import { transformLocation } from "./locationTransformer";
import { loadWeatherData } from "./weatherDataLoader";
import { loadImage } from "./imageLoader";
import { updateView } from "./viewUpdater";

async function handleSubmit(event) {
  event.preventDefault();
  resetView();
  const location = document.getElementById("input-location").value;
  const date = document.getElementById("input-date").value;
  if (checkInput(location, date)) {
    transformLocation({ data: location })
      .then((data) =>
        loadWeatherData({
          lat: data.lat,
          lng: data.lng,
          date: date,
        })
      )
      .then(() => loadImage(location))
      .then(() => updateView(date));
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
