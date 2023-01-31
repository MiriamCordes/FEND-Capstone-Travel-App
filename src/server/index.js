const dotenv = require('dotenv');
dotenv.config();

const express = require('express')

const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})