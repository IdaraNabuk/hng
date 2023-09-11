const express = require('express');
const app = express();
const port = 3000;

app.get('/get_info', (req, res) => {
  try {
    const slackName = req.query.slack_name;
    const track = req.query.track;

    // Get current day of the week and UTC time
    const currentUTCDate = new Date().toUTCString();
    const currentDayOfWeek = new Date().toLocaleString('en-US', { weekday: 'long' });

    // Validate UTC time within +/-2 hours
    const utcOffsetHours = new Date().getTimezoneOffset() / 60;
    if (Math.abs(utcOffsetHours) > 2) {
      return res.status(400).json({ 'Status Code': 'Error', 'Message': 'UTC offset exceeds +/-2 hours' });
    }

    // Get GitHub URLs
    const githubFileURL = `https://github.com/yourusername/yourrepository/blob/main/yourfile.js`;
    const githubSourceURL = `https://github.com/yourusername/yourrepository`;

    // Response JSON
    const response = {
      'Slack name': slackName,
      'Current day of the week': currentDayOfWeek,
      'Current UTC time': currentUTCDate,
      'Track': track,
      'GitHub URL of the file being run': githubFileURL,
      'GitHub URL of the full source code': githubSourceURL,
      'Status Code': 'Success'
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ 'Status Code': 'Error', 'Message': error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});