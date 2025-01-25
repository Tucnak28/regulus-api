import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'temperature_log.csv');

// Function to format time in a human-readable way
function formatTime() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Function to call the API and log data to a CSV file
async function callApiAndLogData() {
    try {
        // Make the GET request using Axios
        const response = await axios.get('http://localhost:3301/custom', {
            headers: {
                accept: 'application/json'
            }
        });

        const data = response.data; // Axios response body
        //console.log('API response:', data); // Log the response

        const dateTime = formatTime(); // Get the formatted time

        // Prepare the log entry as a CSV line
        const logEntry = `${dateTime},${data.zone1.temperature},${data.zone1.requiredTemperature},${data.home.outdoorTemperature},${data.heatPump.rps},${data.dashboard.water.actualTemperature},${data.dashboard.water.requiredTemperature}\n`;

        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            // If file doesn't exist, write the header
            const header = 'Time,Zone1_Temperature,Zone1_RequiredTemperature,OutdoorTemperature,HeatPump_RPS,ActualWater,RequiredWater\n';
            fs.writeFileSync(filePath, header);
        }

        // Append the log entry to the file
        fs.appendFileSync(filePath, logEntry);

        console.log(`Entry was written successfully: ${logEntry}`);
    } catch (error) {
        console.error(`Error while calling API: ${error.message}`);
    }
}

callApiAndLogData();

// Call the function every 10 minutes (600,000 ms)
setInterval(callApiAndLogData, 900000);
