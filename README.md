# Project Summary

This project is the capstone project of the Udacity Front End Web Developer course. It is a web tool that allows users to enter a travel destination and departure date and retreive information about their destination and a weather forecast.

## Project Setup

### Technologies

This project uses the following technologies

- Webserver: Node
- Build tool: Webpack
- External script: Service Worker
- External APIs: Geonames, Weatherbit, Pixabay

### Architecture

The project architecture is as follows

- Root:
  - `package.json`
  - `readme.md`
  - `webpack.dev.js`
  - `webpack.prod.js`
  - test folder
    - `testInputChecker.spec.js`
    - `testServer.spec.js`
  - src folder
    - server folder
      - `index.js`
    - client folder
      - `index.js`
      - html/views folder
        - `index.html`
      - js folder
        - `formHandler.js`
        - `imageLoader.js`
        - `inputChecker.js`
        - `locationTransformer.js`
        - `viewUpdater.js`
        - `weatherDataLoader.js`
      - styles folder
        - `input.scss`
        - `result.scss`

### Run the project

In order to run the project the following steps have to be taken

- clone the repository
- run `npm i` to install the necessary dependencies
- create accounts for external APIs and add the api keys to a `.env` file
- run `npm run build-prod` and `npm run start` to start the development build
- run `node src/server/index.js` to start the node server
- in the browser navigate to `http://localhost:8080`

## Test Setup

In order to run the tests the following terminal command has to be run\
`npm run test`
