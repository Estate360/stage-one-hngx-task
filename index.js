const express = require("express");
const moment = require("moment");
require("dotenv").config();
const app = express();
const port = 3000; // You can change the port as needed

app.get("/api", (req, res) => {
  const { slack_name, track } = req.query;

  // Validate parameters
  if (!slack_name || !track) {
    return res
      .status(400)
      .json({ error: "Both slack_name and track are required." });
  }

  //current date, UTC time, and day of the week
  const currentDate = moment.utc().format("YYYY-MM-DDTHH:mm:ss[Z]");
  const currentDay = moment.utc().format("dddd");

  // Construct response JSON
  const response = {
    slack_name,
    current_day: currentDay,
    utc_time: currentDate,
    track,
    github_file_url: process.env.github_file_url,
    github_repo_url: process.env.github_repo_url,
    status_code: 200,
  };

  res.json(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
