const dotenv = require('dotenv');
dotenv.config();

const express = require('express')

const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const allowList = ['http://localhost:8080', 'http://localhost:8080.*', 'https://secure.geonames.org/*', 'https://api.weatherbit.io/v2.0/*']

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

app.post('/transformLocation', async function(req, res) {
    const encodedPlacename = encodeURIComponent(req.body.data);
   const serverRes = await fetch('https://secure.geonames.org/searchJSON?q=' + encodedPlacename + '&maxRows=1&username=' + process.env.GEO_NAMES_USER_NAME);
    try {
        const result = await serverRes.json();
        console.log(result);
        const geoName = result.geonames[0];
        const geoData = {
            'lat': geoName.lat,
            'lng': geoName.lng,
            'cityName': geoName.name,
            'countryName': geoName.countryName
        }
        console.log(geoData);
        res.send(geoData);
    } catch (error) {
        console.log("Error transforming location: ", error);
    }
})

app.get('/weatherData/:lat;:lng', async function(req, res) {
    const lat = req.params.lat;
    const lon = req.params.lng;
    const serverRes = await fetch('https://api.weatherbit.io/v2.0/forecast/daily?lat=' + lat + "&lon=" + lon + '&key=' + process.env.WEATHER_BIT_API_KEY);
    try {
        const result = await serverRes.json();
        console.log(result);
        // TODO build object to send back to client
        // res.send(object);
    } catch (error) {
        console.log("Error transforming location: ", error);
    }
})