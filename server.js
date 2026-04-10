require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const BASE_URL = process.env.BASE_URL;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/elevator-data', async (req, res) => {
  const { deviceCode } = req.query;
  if (!deviceCode) {
    return res.status(400).json({ error: 'deviceCode is required' });
  }

  try {
    const url = `${BASE_URL}/local/v1/findElevatorComprehensiveData?deviceCode=${encodeURIComponent(deviceCode)}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('API request failed:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`BASE_URL: ${BASE_URL}`);
});
