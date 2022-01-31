const fs = require('fs')
const Clicks = require('./clicks.js')

//Retrieve dataset from json file
let dataset = JSON.parse(fs.readFileSync('clicks.json'));

dataset = Clicks.manipulateDataset(dataset)

//Download JSON file
Clicks.saveToFile(dataset)