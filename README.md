# Regulus API Package

This is a basic Express API for Regulus heat pumps controlled by PLC IR14CTC. 
It helps developers or advanced users to integrate heat pump data to any smart solution eg: Home Assistant. You can get the most necessary information from your heat pump machine like sensor temperatures, statuses, time and others. You dont need internet connection, just local IP address, that your device is running on.
This API does not support 'service mode' control. 

It comes from offical Regulus web app and copies its structure for better transparency, hence each endpoint relates to an individual page. 


## Configuration

This package requires an `.env` file in the root directory for configuration. Please create a file called `.env` and set the following variables:

```bash
# port for local running, default port = 3301
PORT=<local-port>
# local ip address of your Regulus Heat pump 
HOST_IP_ADDRESS=<your-host-ip>
# user name and password provided by your local Regulus dealer 
USER=<user> 
PASSWORD=<password>
```

## Local running

1. Copy whole project
2. Install dependencies:
```bash
npm install
```
This will create 'node_modules' dir with all necessary dependencies.

3. Run the Application locally:
```bash
npm run start
```
This will build the application into the '/dist' folder and run local 'express' server.

4. Copy index.html and previously created .env file from '/src' to '/dist'.

3. Run on your browser
```bash
http://localhost:<local-port>
```
You should see index.html with swagger link for API documentation


## Installation

To install the package, run:
```bash
npm install regulus-api
```

