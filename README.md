# Cost Manager - Final Project

A comprehensive cost management web application built with React, Material-UI, and IndexedDB.

## Team

- **Team Manager**: Arad Levi
- **Team Members**: Arad Levi, Roni Baranes, Mor Sigman

## Live Demo

- **Application**: https://cost-manager-project-i3wi.onrender.com/
- **Demo Video**: https://youtu.be/GiU8bvubbuQ?si=DXdEWg3gh1Npsyop

## Features

- **Add Costs**: Add new cost items with amount, currency, category, and description
- **Monthly Reports**: View detailed reports for specific months and years
- **Pie Charts**: Visualize cost distribution by category
- **Bar Charts**: View yearly cost trends across all 12 months
- **Currency Support**: USD, ILS, GBP, and EURO with automatic conversion
- **Dark/Light Mode**: Toggle between dark and light themes
- **Settings**: Configure custom URL for exchange rates
- **Offline Storage**: All data stored locally using IndexedDB

## Project Structure

```
cost-manager/
├── public/
│   ├── idb.js              # Vanilla JS IndexedDB library (for testing)
│   ├── test-idb.html       # Test page for idb.js
│   └── rates.json          # Exchange rates file
├── src/
│   ├── db/
│   │   └── idb-react.js    # React/ES6 module version of IndexedDB library
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

1. Clone the repository:
```bash
git clone https://github.com/aradlevi8799/client-side-new-arad.git
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Technologies Used

- **React 18** - UI framework
- **Material-UI (MUI) 7** - Component library
- **Vite 5** - Build tool
- **IndexedDB** - Client-side database
- **Chart.js 4** - Data visualization
- **React-Chartjs-2** - React wrapper for Chart.js

## idb.js Library

The project includes two versions of the IndexedDB wrapper library:

### Vanilla JS Version (`public/idb.js`)
- For testing with simple HTML
- Exposes `idb.openCostsDB()` globally
- Test with `public/test-idb.html`

### React/ES6 Module Version (`src/db/idb-react.js`)
- For use in React application
- Uses ES6 imports/exports
- Integrates with CurrencyService

### API Methods

```javascript
// Open database
const db = await idb.openCostsDB("costsdb", 1);

// Add cost item
const result = await db.addCost({
  sum: 200,
  currency: "USD",
  category: "FOOD",
  description: "pizza"
});

// Get monthly report
const report = await db.getReport(2025, 1, "USD");
```

## Supported Currencies

- USD (US Dollar) - Base currency
- ILS (Israeli Shekel)
- GBP (British Pound)
- EURO (Euro)

Exchange rates are fetched from: `https://cost-manager-project-i3wi.onrender.com/rates.json`

## Code Style

The code follows the style guide at http://www.abelski.com/courses/stylejs/languagerules.pdf

## License

Final project for Front-End Development course.
