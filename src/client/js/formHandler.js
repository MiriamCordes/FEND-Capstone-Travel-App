import { checkInput } from "./inputChecker";
import { transformLocation } from "./locationTransformer";
import { loadWeatherData } from "./weatherDataLoader";
import { loadImage } from "./imageLoader";
import { updateView } from "./viewUpdater";

async function handleSubmit(event) {
  event.preventDefault();
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

export { handleSubmit };
