const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory user data store (replace with DB in production)
const userData = {};

// Save time data endpoint
app.post('/api/save-time', (req, res) => {
  const { userId, domain, timeSpent, timestamp, category } = req.body;
  if (!userId || !domain || !timeSpent) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  if (!userData[userId]) userData[userId] = [];
  userData[userId].push({ domain, timeSpent, timestamp, category });
  res.json({ status: 'success' });
});

// Get user data endpoint
app.get('/api/get-data/:userId', (req, res) => {
  const userId = req.params.userId;
  res.json(userData[userId] || []);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
