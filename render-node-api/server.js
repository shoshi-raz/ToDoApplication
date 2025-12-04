require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// ✅ GET /services – מחזיר את רשימת השירותים בחשבון Render
app.get('/services', async (req, res) => {
  try {
    const apiKey = process.env.RENDER_API_KEY;

    if (!apiKey) {
      return res.status(400).json({ error: 'RENDER_API_KEY not set' });
    }

    const response = await axios.get("https://api.render.com/v1/services", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json"
      }
    });

    res.json(response.data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ברירת־מחדל של Render: יצירת פורט אוטומטי דרך process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
