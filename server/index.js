const express = require('express');
const cors = require('cors');
const sheetsService = require('./sheets');
const config = require('./config');

const app = express();

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = Array.isArray(config.server.corsOrigin)
        ? config.server.corsOrigin
        : [config.server.corsOrigin];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['POST'],
  })
);
app.use(express.json());

// Initialize Google Sheets
(async () => {
  try {
    sheetsService.init();
    console.log('Google Sheets service initialized');
  } catch (error) {
    console.error('Failed to initialize Google Sheets:', error);
  }
})();

// Form submission endpoint
app.post('/api/submit', async (req, res) => {
  try {
    const success = await sheetsService.addSubmission(req.body);
    if (success) {
      res.status(200).json({ message: 'Submission successful' });
    } else {
      res.status(500).json({ message: 'Failed to save submission' });
    }
  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
app.listen(config.server.port, () => {
  console.log(`Server running on port ${config.server.port}`);
});
