const fs = require('fs');
const data = require('./heartrate.json');
const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${year}-${month}-${day}`;
let latestDataTimestamp = new Date().toJSON();

var calc = function(max, min) {
    for (var i = 0; i < 1; ++i) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

var writeToJson = function(currentDate, min, max, median, timestamp) {
    let data = {"date":currentDate,"min": min, "median": max, "max": median, "latestDataTimestamp": timestamp};
    let jsonData = JSON.stringify(data);
    fs.writeFileSync("./output.json", jsonData);
}

writeToJson(currentDate, calc(data.min, 30), calc(data.max, 81), calc(data.median, 60), latestDataTimestamp);
