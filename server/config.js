require('dotenv').config();

module.exports = {
  googleSheets: {
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
  },
  server: {
    port: process.env.PORT || 3000,
    corsOrigin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
  },
};
