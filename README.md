# iPhone Landing Page

A modern, responsive landing page for showcasing the latest iPhone model, built with HTML, CSS, and vanilla JavaScript.

## Features

- 📱 Responsive design that works on all devices
- 🎨 Modern UI with smooth animations
- 🖼️ Image gallery with hover effects
- 💳 Interactive pricing cards
- 🛒 Modal purchase form
- 🔄 Smooth scroll navigation
- 🌟 Animated features section
- 📊 Technical specifications display

## Technologies Used

- HTML5
- CSS3 (with CSS Variables, Flexbox, and Grid)
- JavaScript (Vanilla)
- Font Awesome Icons

## Project Structure

```
landing_page/
├── index.html          # Main HTML file
├── styles.css         # CSS styles
├── script.js         # JavaScript functionality
├── server/           # Backend server files
│   ├── config.js
│   ├── index.js
│   ├── package.json
│   └── sheets.js
├── images/           # Image assets
│   ├── gallery1.jpg
│   ├── gallery2.jpg
│   ├── gallery3.jpg
│   └── iphone.png
└── lang/             # Internationalization files
    ├── en.json
    ├── es.json
    └── fr.json
```

## Key Features Implementation

### Responsive Navigation

- Fixed navigation bar with backdrop blur effect
- Smooth scrolling to sections
- Mobile-responsive menu

### Hero Section

- Split layout with content and floating image
- Gradient text effects
- Call-to-action button

### Features Grid

- Card-based layout using CSS Grid
- Hover animations
- Icon integration

### Technical Specifications

- Clean, minimalist design
- Grid-based layout
- Responsive sizing

### Image Gallery

- Responsive grid layout
- Image hover effects
- Optimized for performance

### Pricing Section

- Interactive pricing cards
- Featured plan highlighting
- Modal-based purchase form

### Purchase Modal

- Form validation
- Responsive design
- Smooth animations

## Backend Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Google Cloud Platform account
- Google Sheets API enabled

### Google Sheets Integration

1. Create a Google Cloud Project
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select an existing one
   - Enable the Google Sheets API

2. Create Service Account
   - In Google Cloud Console, go to "IAM & Admin" > "Service Accounts"
   - Click "Create Service Account"
   - Name your service account and click "Create"
   - Grant "Editor" role for Google Sheets API
   - Create and download the JSON key file

3. Set Up Environment Variables
   Create a `.env` file in the `server` directory:
   ```
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
   ```

4. Share Your Google Sheet
   - Create a new Google Sheet
   - Share it with your service account email (Editor access)
   - Copy the spreadsheet ID from the URL

5. Configure Backend
   - Install dependencies: `cd server && npm install`
   - Update `config.js` with your spreadsheet ID
   - Start the server: `npm start`

### Backend Structure

```
server/
├── config.js          # Configuration and environment variables
├── index.js          # Express server setup
├── package.json      # Node.js dependencies
└── sheets.js         # Google Sheets service integration
```

### API Endpoints

- `POST /api/submit-form` - Submit form data to Google Sheets
- Additional endpoints documented in the server code

## Getting Started

1. Clone the repository
2. Open `index.html` in your web browser
3. No build process required - it's ready to use!

## Development

1. Frontend Setup
   ```bash
   # Install dependencies
   npm install

   # Start development server
   npm start
   ```

2. Backend Setup
   ```bash
   # Navigate to server directory
   cd server

   # Install dependencies
   npm install

   # Start backend server
   npm start
   ```

## Environment Variables

Create a `.env` file in the server directory with the following:

```
PORT=3000
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="your-private-key"
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Best Practices

- Semantic HTML structure
- Mobile-first responsive design
- CSS custom properties for theming
- Optimized animations for performance
- Accessible form elements
- Progressive enhancement

## Credits

- Font Awesome for icons
- System font stack for optimal performance
- Images should be replaced with your own content

## License

This project is available for personal and commercial use.

## Tutorial

Tutorial get key google
https://chatgpt.com/share/6808894e-aee8-8010-b5a6-0133e1e2162f
