# Cost Manager - Final Project

A comprehensive cost management web application built with React, Material-UI, and IndexedDB.

## Features

- **Add Costs**: Add new cost items with amount, currency, category, and description
- **Monthly Reports**: View detailed reports for specific months and years
- **Pie Charts**: Visualize cost distribution by category
- **Bar Charts**: View yearly cost trends across all 12 months
- **Currency Support**: Supports USD, ILS, GBP, and EURO with automatic conversion
- **Settings**: Configure custom URL for exchange rates
- **Offline Storage**: All data stored locally using IndexedDB

## Project Structure

```
client-side-new/
├── public/
│   ├── idb.js              # Vanilla JS version for testing
│   ├── test-idb.html       # Test page for idb.js
│   └── rates.json          # Example exchange rates file
├── src/
│   ├── db/
│   │   └── idb-react.js    # React version of IndexedDB wrapper
│   ├── pages/
│   │   ├── AddCostPage.jsx
│   │   ├── MonthlyReportPage.jsx
│   │   ├── PieChartPage.jsx
│   │   ├── BarChartPage.jsx
│   │   └── SettingsPage.jsx
│   ├── services/
│   │   └── CurrencyService.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Deployment

### Step 1: Deploy Exchange Rates JSON

1. Create a `rates.json` file with the following format:
```json
{
  "USD": 1,
  "GBP": 0.79,
  "EURO": 0.92,
  "ILS": 3.65
}
```

2. Upload this file to a publicly accessible URL (e.g., GitHub Pages, GitHub raw content, or any static file hosting)

3. Make sure the URL includes CORS headers: `Access-Control-Allow-Origin: *`

4. Update `src/services/CurrencyService.js` with your URL:
```javascript
export const DEFAULT_RATES_URL = "https://your-url.com/rates.json";
```

### Step 2: Deploy the Application

#### Option A: Render.com (Recommended)

1. Create account on [render.com](https://render.com)
2. Connect your GitHub repository
3. Create new "Static Site"
4. Configure:
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
5. Deploy

#### Option B: Netlify

1. Create account on [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Configure:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
4. Deploy

#### Option C: GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json:
```json
{
  "homepage": "https://yourusername.github.io/client-side-new",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

## Testing idb.js

Open `public/test-idb.html` in a browser to test the vanilla JavaScript version of the idb.js library.

## Technologies Used

- **React 18** - UI framework
- **Material-UI (MUI) 7** - Component library
- **Vite** - Build tool
- **IndexedDB** - Browser database
- **Chart.js** - Data visualization
- **React-Chartjs-2** - React wrapper for Chart.js

## Code Style

The code follows the style guide at http://www.abelski.com/courses/stylejs/languagerules.pdf

## Requirements Checklist

- ✅ IndexedDB database implementation
- ✅ Add cost functionality with sum, currency, category, description
- ✅ Monthly detailed report
- ✅ Pie chart by category
- ✅ Bar chart for yearly overview
- ✅ Currency conversion (USD, ILS, GBP, EURO)
- ✅ Fetch API for exchange rates
- ✅ Settings page for custom exchange rates URL
- ✅ React + MUI implementation
- ✅ Two versions of idb.js (vanilla and React)
- ✅ Promise-based API
- ✅ Proper comments and documentation

## License

This project is created as a final project for Front-End Development course.
