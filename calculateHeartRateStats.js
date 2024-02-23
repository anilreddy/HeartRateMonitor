const fs = require('fs');

function calculateHeartRateStatistics(heartRateData) {
let dDatas = [];
    // HeartRateData is sorted by date and time based on 'heartbeat.json'
let dates = Array.from(new Set(heartRateData
        .filter(function (data) { return data && data.timestamps && data.timestamps.startTime; })
        .map(function (data) { return data.timestamps.startTime.split('T')[0]; })));

        for (let i = 0, j = dates; i < j.length; i++) {
            let date = j[i];
            let dData = heartRateData.filter(function (data) { return data.timestamps.startTime.startsWith(date); });
            let beatsPerMinuteArray = dData.map(function (data) { return data.beatsPerMinute; });
            let min = Math.min.apply(Math, beatsPerMinuteArray);
            let max = Math.max.apply(Math, beatsPerMinuteArray);
            let median = calculateMedian(beatsPerMinuteArray);
            let latestDataTimestamp = dData[dData.length - 1].timestamps.endTime;

            // Generates data in the specified format in JSON file
            dDatas.push({
                date: date,
                min: min,
                max: max,
                median: median,
                latestDataTimestamp: latestDataTimestamp,
            });

        }
        return dDatas;
}

// Function to calculate median
function calculateMedian(values) {
    values.sort((a, b) => a - b);
    const half = Math.floor(values.length / 2);
    if (values.length % 2 === 0) {
        return (values[half - 1] + values[half]) / 2.0;
    } else {
        return values[half];
    }
}

let inputFilename = 'heartrate.json';
let inputData = JSON.parse(fs.readFileSync(inputFilename, 'utf8'));


let heartRateStats = calculateHeartRateStatistics(inputData);

// Convert data to JSON
const jsonData = JSON.stringify(heartRateStats, null, 2);

// Write JSON data to file
fs.writeFileSync('output.json', jsonData);

console.log('Heartbeat data generated and saved to output.json');
