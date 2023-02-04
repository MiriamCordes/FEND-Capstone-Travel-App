const dotenv = require('dotenv');
dotenv.config();

const express = require('express')

const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const allowList = ['http://localhost:8080', 'https://secure.geonames.org/*']
const corsOptions = {
    origin: function (origin, callback) {
        if (allowList.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      }
}

app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.post('/transformLocation', cors(corsOptions), async function(req, res) {
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