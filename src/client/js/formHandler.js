import { checkInput } from "./inputChecker"
import { transformLocation } from "./locationTransformer"
import { loadWeatherData } from "./weatherDataLoader"
import { loadImage } from "./imageLoader"

function handleSubmit(event) {
    event.preventDefault();
    const location = document.getElementById('input_location').value;
    const date = document.getElementById('input_date').value;
    if(checkInput(location, date)) {
        transformLocation({data: location})
        .then(function(data = {}) {
            loadWeatherData({
                'lat': data.lat,
                'lng': data.lng,
                'date': date
            })
        })
        .then(function(){
           loadImage(location)
        })
       /* .then(function(data = {}) {
            // Update UI
        })*/
    } else {
        alert("Please add valid input data");
    }
    // check validity of inputs
    // get geo location from location with geonames
    // get wheater data with wheatherbit
    // get image with pixabay
    // update ui
}

export { handleSubmit }