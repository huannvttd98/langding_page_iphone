const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const config = require('./config');

class SheetsService {
  constructor() {
    console.log('SheetsService constructor called');
  }

  async init() {
    console.log('Initializing Google Sheets service...');
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    if (
      !config.googleSheets.credentials.client_email ||
      !config.googleSheets.credentials.private_key
    ) {
      throw new Error(
        'Google Sheets credentials are not set in the environment variables.'
      );
    }
    // Fix: Use the correct authentication method
    this.doc = new GoogleSpreadsheet(
      config.googleSheets.spreadsheetId,
      serviceAccountAuth
    );

    await this.doc.loadInfo();
    this.sheet = this.doc.sheetsByIndex[0];
  }

  async addSubmission(data) {
    try {
      await this.sheet.addRow({
        Timestamp: new Date().toISOString(),
        Name: data.name,
        Email: data.email,
        Phone: data.phone,
        'Model Selection': data.model,
        'Storage Capacity': data.storage,
        'Color Choice': data.color,
        'Payment Method': data.paymentMethod,
        'Additional Notes': data.notes,
      });
      return true;
    } catch (error) {
      
      console.error('Error adding submission:', error);
      return false;
    }
  }
}

module.exports = new SheetsService();
