console.log("--------------------bjhbl-----------------");
require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.get('/services', async (req, res) => {
  try {
    console.log("לפני");

    const apiKey = process.env.RENDER_API_KEY;

    console.log("after");
    console.log("API Key length:", apiKey ? apiKey.length : "NOT FOUND");

    const response = await axios.get("https://api.render.com/v1/services", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json"
      }
    });

    res.json(response.data);

  } catch (err) {
    res.json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
