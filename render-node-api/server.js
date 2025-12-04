
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Render Node API",
      version: "1.0.0",
      description: "API for Render Node project",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
      {
        url: process.env.RENDER_EXTERNAL_URL || 'https://your-render-app.onrender.com',
      },
    ],
  },
  apis: ["./server.js"], // קובץ זה עצמו יתועד עם JSDoc
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// =========================
// Endpoints
// =========================

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get list of Render services
 *     responses:
 *       200:
 *         description: List of services
 *       400:
 *         description: API Key not set
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check
 *     responses:
 *       200:
 *         description: Server is running
 */
app.get('/', (req, res) => {
  res.send("✅ API is running! Open Swagger UI at /api-docs");
});

// =========================
// Start server
// =========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));









// require('dotenv').config();
// const express = require('express');
// const axios = require('axios');

// const app = express();
// app.use(express.json());

// // ✅ GET /services - מחזיר את רשימת השירותים מ-Render
// app.get('/services', async (req, res) => {
//   try {
//     const apiKey = process.env.RENDER_API_KEY;

//     if (!apiKey) {
//       return res.status(400).json({ error: 'RENDER_API_KEY not set' });
//     }

//     const response = await axios.get("https://api.render.com/v1/services", {
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//         Accept: "application/json"
//       }
//     });

//     res.json(response.data);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
