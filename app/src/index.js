// Thanks ChatGPT for the code

// Import required modules
const express = require('express');
const moment = require('moment-timezone');

// Initialize the Express app
const app = express();
const port = 3000;

// Helper function to find a timezone where it's 5 PM
function getRandomCityAtFivePM() {
  const now = moment();
  const allTimezones = moment.tz.names(); // Get all available timezones

  // Filter timezones where it's 5 PM
  const matchingTimezones = allTimezones.filter((timezone) => {
    const cityTime = now.tz(timezone);
    return cityTime.hour() === 17; // Check if it's 5 PM
  });

  // If no timezone matches, return null
  if (matchingTimezones.length === 0) return null;

  // Pick a random timezone
  const randomTimezone = matchingTimezones[Math.floor(Math.random() * matchingTimezones.length)];
  return randomTimezone;
}

// Define a route to display the city
app.get('/', (req, res) => {
  const timezone = getRandomCityAtFivePM();
  let content;
  if (timezone) {
    content = `
      <div class="content">
        It's <b>5 PM</b> in the timezone: <b>${timezone}</b>!
      </div>
    `;
  } else {
    content = `
      <div class="content">
        Sorry, it is not 5 PM in any timezone right now.
      </div>
    `;
  }

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Timezones</title>
      <style>
        body {
          margin: 0;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Arial', sans-serif;
          background: linear-gradient(135deg, #4facfe, #00f2fe);
          color: #ffffff;
        }
        .content {
          text-align: center;
          font-size: 2rem;
          background: rgba(0, 0, 0, 0.5);
          padding: 20px;
          border-radius: 10px;
        }
      </style>
    </head>
    <body>
      ${content}
    </body>
    </html>
  `;

  res.send(html);
});

// Start the server
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
