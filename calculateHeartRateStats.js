const fs = require('fs');

// Function to calculate median
function median(values) {
    values.sort((a, b) => a - b);
    const half = Math.floor(values.length / 2);
    if (values.length % 2 === 0) {
        return (values[half - 1] + values[half]) / 2.0;
    } else {
        return values[half];
    }
}

// Generate heartbeat data for last 4 days
const today = new Date();
const heartbeatData = [];
const currentDate = new Date(today);

for (let i = 0; i < 4; i++) {
    currentDate.setDate(today.getDate() - i);
    const dayData = {
        date: currentDate.toISOString().split('T')[0],
        min: Math.floor(Math.random() * (80 - 60 + 1)) + 60, // Minimum heart rate
        max: Math.floor(Math.random() * (120 - 100 + 1)) + 100, // Maximum heart rate
        // Simulating heart rate readings for the day
        // heartRates: [/* Insert heart rate readings here */]
    };
    heartbeatData.push(dayData);
}

// Calculate and add median for each day
heartbeatData.forEach(day => {
    // Calculate median from min and max values
    day.median = Math.round(median([day.min, day.max]));
    day.latestTimeStamp = currentDate.toISOString();
});

// Convert data to JSON
const jsonData = JSON.stringify(heartbeatData, null, 2);

// Write JSON data to file
fs.writeFileSync('output.json', jsonData);

console.log('Heartbeat data generated and saved to output.json');
