import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'temperature_log.csv');

// Function to call the API and log data
async function callApiAndLogData() {
    try {
        // Make the GET request using Axios
        const response = await axios.get('http://localhost:3301/custom', {
            headers: {
                accept: 'application/json'
            }
        });

        const data = response.data; // Axios response body

        const dateTime = new Date().toISOString();

        // Format the log entry using tabs (\t) instead of commas
        const logEntry = `${dateTime}\t${data.zone1.temperature}\t${data.zone1.requiredTemperature}\t${data.home.outdoorTemperature}\n`;

        // Check if the file exists, if not, write the header
        if (!fs.existsSync(filePath)) {
            const header = 'Time\tZone1_Temperature\tZone1_RequiredTemperature\tOutdoorTemperature\n';
            fs.writeFileSync(filePath, header);
        }

        // Append the log entry to the file
        fs.appendFileSync(filePath, logEntry);

        console.log(`Entry was written successfully: ${logEntry}`);
    } catch (error) {
        console.error(`Error while calling API: ${error.message}`);
    }
}

// Call the function every 10 minutes (600,000 ms)
setInterval(callApiAndLogData, 10 * 60 * 1000);
