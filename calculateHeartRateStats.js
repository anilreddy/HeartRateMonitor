const fs = require('fs');

// Function to generate random heart rate data
function generateHeartRateData(count) {
    const data = [];
    for (let i = 0; i < count; i++) {
        const heartRate = Math.floor(Math.random() * (150 - 60 + 1)) + 60; // Generating heart rate between 60 and 150
        data.push(heartRate);
    }
    return data;
}

// Function to calculate minimum, maximum, and median heart rates
function calculateStats(heartRateData) {
    const sortedData = heartRateData.slice().sort((a, b) => a - b);
    const min = sortedData[0];
    const max = sortedData[sortedData.length - 1];
    const median = sortedData[Math.floor(sortedData.length / 2)];
    return { min, max, median };
}

// Generate heart rate data
const heartRateData = generateHeartRateData(100);

// Calculate statistics
const { min, max, median } = calculateStats(heartRateData);

// Create JSON object
const heartRateJSON = {
    date: new Date().toLocaleDateString(),
    minimum: min,
    maximum: max,
    median: median,
    timestamp: new Date().toJSON()
};

// Convert JSON object to string
const jsonData = JSON.stringify(heartRateJSON, null, 2);

// Write JSON data to file
fs.writeFileSync('output.json', jsonData, 'utf-8');

console.log('Heart rate data saved to output.json');
