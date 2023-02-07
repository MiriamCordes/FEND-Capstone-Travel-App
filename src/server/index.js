const dotenv = require('dotenv');
dotenv.config();

const express = require('express')

const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const allowList = ['http://localhost:8080', 'http://localhost:8080.*', 'https://secure.geonames.org/*', 'https://api.weatherbit.io/v2.0/*', 'https://pixabay.com/api/*']

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", allowList);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

viewModel = {
    geoData : {},
    weather : [], 
    imageUrl : ""
}

app.post('/transformLocation', async function(req, res) {
    const encodedPlacename = encodeURIComponent(req.body.data);
    const serverRes = await fetch('https://secure.geonames.org/searchJSON?q=' + encodedPlacename + '&maxRows=1&username=' + process.env.GEO_NAMES_USER_NAME);
    try {
        const result = await serverRes.json();
        const geoName = result.geonames[0];
        const geoData = {
            'lat': geoName.lat,
            'lng': geoName.lng,
            'cityName': geoName.name,
            'countryName': geoName.countryName
        }
        viewModel.geoData = geoData;
        res.send(geoData);
    } catch (error) {
        console.log("Error transforming location: ", error);
    }
})

app.get('/currentWeather/:lat;:lng', async function(req, res) {
    const lat = req.params.lat;
    const lon = req.params.lng;
    const serverRes = await fetch('https://api.weatherbit.io/v2.0/current?lat=' + lat + "&lon=" + lon + '&key=' + process.env.WEATHER_BIT_API_KEY);
    try {
        const result = await serverRes.json();
        const resultData = result.data[0];
        const weatherResult = {
            'date': new Date(),
            'desc': resultData.weather.description,
            'temp': resultData.temp
        }
        const weatherResultList = [weatherResult];
        viewModel.weather = weatherResultList;
        res.send(weatherResultList);
    } catch (error) {
        console.log("Error loading current weather: ", error);
    }
})

app.get('/weatherForecast/:lat;:lng', async function(req, res) {
    const lat = req.params.lat;
    const lon = req.params.lng;
    const serverRes = await fetch('https://api.weatherbit.io/v2.0/forecast/daily?lat=' + lat + "&lon=" + lon + '&key=' + process.env.WEATHER_BIT_API_KEY);
    try {
        const result = await serverRes.json();
        const resultDataArray = result.data;
        const weatherResultList = [];
        for(const entry of resultDataArray) {
            weatherResultList.push({
                'date': entry.valid_date,
                'desc': entry.weather.description,
                'temp': entry.temp
            })
        }
        viewModel.weather = weatherResultList;
        res.send(weatherResultList);
    } catch (error) {
        console.log("Error loading weather forecast: ", error);
    }
})

app.get('/loadImage/:location', async function(req, res) {
    const location = encodeURIComponent(req.body.location);
    const serverRes = await fetch('https://pixabay.com/api/?q=' + location + '&per_page=3' + '&key=' + process.env.PIXABAY_API_KEY);
    try {
        const result = await serverRes.json();
        const resultDataArray = result.hits;
        const firstImageUrl = resultDataArray[0].webformatURL;
        viewModel.imageUrl = firstImageUrl
        res.send({'data': firstImageUrl});
    } catch (error) {
        console.log("Error loading image: ", error);
    }
})

app.get('/travelResult', function(req, res) {
    console.log(viewModel);
    res.send(viewModel);
})