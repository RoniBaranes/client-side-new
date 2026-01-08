# Cost Manager Project - Summary

## מה נוצר בפרויקט

### מבנה הפרויקט

```
client-side-new/
│
├── public/
│   ├── idb.js              ✅ Vanilla JS version for testing
│   ├── test-idb.html       ✅ Test page for vanilla idb.js
│   └── rates.json          ✅ Example exchange rates
│
├── src/
│   ├── db/
│   │   └── idb-react.js    ✅ React version with ES6 modules
│   │
│   ├── services/
│   │   └── CurrencyService.js  ✅ Currency conversion service
│   │
│   ├── pages/
│   │   ├── AddCostPage.jsx         ✅ Add new cost
│   │   ├── MonthlyReportPage.jsx   ✅ Monthly detailed report
│   │   ├── PieChartPage.jsx        ✅ Category pie chart
│   │   ├── BarChartPage.jsx        ✅ Yearly bar chart
│   │   └── SettingsPage.jsx        ✅ Settings for custom URL
│   │
│   ├── App.jsx             ✅ Main app component
│   └── main.jsx            ✅ Entry point
│
├── index.html              ✅ HTML template
├── vite.config.js          ✅ Vite configuration
├── package.json            ✅ Dependencies
├── .gitignore              ✅ Git ignore rules
│
├── README.md               ✅ Project documentation
├── DEPLOYMENT_GUIDE.md     ✅ Deployment instructions
├── CHECKLIST.md            ✅ Pre-submission checklist
└── PROJECT_SUMMARY.md      ✅ This file

```

## תכונות מרכזיות

### 1. הוספת הוצאות ✅
- טופס להוספת הוצאה חדשה
- שדות: סכום, מטבע, קטגוריה, תיאור
- תאריך אוטומטי
- אימות נתונים
- שמירה ב-IndexedDB

### 2. דוח חודשי ✅
- בחירת שנה וחודש
- בחירת מטבע לתצוגה
- טבלה עם כל ההוצאות
- המרת מטבעות אוטומטית
- סכום כולל

### 3. תרשים עוגה ✅
- הצגה לפי קטגוריות
- תמיכה בכל המטבעות
- צבעים שונים לכל קטגוריה
- אינטראקטיבי עם tooltips

### 4. תרשים עמודות ✅
- הצגה שנתית (12 חודשים)
- תמיכה בכל המטבעות
- אינטראקטיבי
- מראה מגמות

### 5. המרת מטבעות ✅
- 4 מטבעות נתמכים: USD, ILS, GBP, EURO
- שערי חליפין מ-server (Fetch API)
- שמירת מטבע מקורי בכל הוצאה
- המרה דינמית בעת תצוגה

### 6. הגדרות ✅
- הגדרת URL מותאם אישית לשערי חליפין
- שמירה ב-localStorage
- אפשרות לאיפוס להגדרות ברירת מחדל

## טכנולוגיות

- **React 18.3.1** - ספריית UI
- **Material-UI (MUI) 7** - רכיבי UI
- **Vite 5** - כלי build מהיר
- **IndexedDB** - מסד נתונים בדפדפן
- **Chart.js 4** - תרשימים
- **React-Chartjs-2 5** - React wrapper ל-Chart.js

## קבצי idb.js - שתי גרסאות

### 1. Vanilla Version ([public/idb.js](public/idb.js))
- ללא modules
- מוסיף `idb` לאובייקט הגלובלי
- לבדיקה עצמאית
- עובד עם קוד הדוגמה מהמסמך

### 2. React Version ([src/db/idb-react.js](src/db/idb-react.js))
- עם ES6 modules
- import/export
- משתלב עם React
- פונקציות נוספות לתרשימים

## API של idb.js

### openCostsDB(databaseName, databaseVersion)
```javascript
const db = await idb.openCostsDB("costsdb", 1);
```
מחזיר Promise עם אובייקט database wrapper

### addCost(cost)
```javascript
const result = await db.addCost({
  sum: 200,
  currency: "USD",
  category: "FOOD",
  description: "pizza"
});
```
מוסיף הוצאה חדשה, מחזיר Promise עם הנתונים

### getReport(year, month, currency)
```javascript
const report = await db.getReport(2025, 9, "USD");
```
מחזיר דוח מפורט עם כל ההוצאות

## פורמט JSON לשערי חליפין

```json
{
  "USD": 1,
  "GBP": 0.79,
  "EURO": 0.92,
  "ILS": 3.65
}
```

## איך להריץ את הפרויקט

### Development
```bash
npm install
npm run dev
```
האפליקציה תרוץ על http://localhost:5173

### Production Build
```bash
npm run build
```
הקבצים ייווצרו בתיקיית `dist/`

### Preview Production Build
```bash
npm run preview
```

## בדיקת idb.js

פתח את הדפדפן:
```
http://localhost:5173/test-idb.html
```
או אחרי build:
```
dist/test-idb.html
```

## דרישות שהושלמו

✅ שימוש ב-IndexedDB
✅ הוספת הוצאות עם כל השדות
✅ דוח חודשי מפורט
✅ תרשים עוגה לפי קטגוריות
✅ תרשים עמודות שנתי
✅ תמיכה ב-4 מטבעות
✅ Fetch API לשערי חליפין
✅ מסך הגדרות
✅ React + MUI
✅ שתי גרסאות של idb.js
✅ Promise-based API
✅ הערות מפורטות בקוד
✅ תואם לדפדפני desktop

## מה צריך לעשות לפני הגשה

1. **פרוס את rates.json**
   - העלה לגיטהאב או שרת אחר
   - עדכן את `DEFAULT_RATES_URL` ב-[src/services/CurrencyService.js](src/services/CurrencyService.js)

2. **פרוס את האפליקציה**
   - Render.com (מומלץ)
   - או Netlify/Vercel/GitHub Pages

3. **צור סרטון**
   - עד 60 שניות
   - העלה ליוטיוב כ-unlisted
   - הראה את כל הפיצ'רים

4. **הכן PDF**
   - כל קבצי הקוד
   - שם הקובץ: firstname_lastname.pdf
   - פרטי הצוות בראש
   - קישור לסרטון

5. **הכן קבצים**
   - idb.js וונילי
   - ZIP (ללא node_modules!)

6. **הגש**
   - במוודל
   - לפני 23:30 (זכור ה-30 דקות!)

## תמיכה

- קרא את [README.md](README.md) למידע כללי
- קרא את [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) להוראות פריסה
- בדוק את [CHECKLIST.md](CHECKLIST.md) לפני הגשה
- שאל בפורום הקורס לשאלות

## רישיון

פרויקט גמר בקורס Front-End Development

---

**Created with ❤️ by the development team**
