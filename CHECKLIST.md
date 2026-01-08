# Cost Manager - Requirements Checklist

רשימת בדיקה לפני הגשת הפרויקט

## דרישות טכניות

### 1. מסד נתונים (IndexedDB)
- [x] שימוש ב-IndexedDB
- [x] Object store בשם "costs"
- [x] Index לפי year + month
- [x] Auto-increment ID

### 2. פונקציונליות - הוספת הוצאות
- [x] שדה sum (מספר)
- [x] שדה currency (USD/ILS/GBP/EURO)
- [x] שדה category
- [x] שדה description
- [x] תאריך אוטומטי (תאריך ההוספה)
- [x] שמירת המטבע המקורי ב-IndexedDB

### 3. דוח חודשי מפורט
- [x] בחירת שנה
- [x] בחירת חודש
- [x] בחירת מטבע לתצוגה
- [x] רשימת כל ההוצאות
- [x] המרת מטבעות
- [x] סכום כולל

### 4. תרשים עוגה (Pie Chart)
- [x] הצגת הוצאות לפי קטגוריה
- [x] לחודש ושנה ספציפיים
- [x] בחירת מטבע לתצוגה
- [x] המרת מטבעות

### 5. תרשים עמודות (Bar Chart)
- [x] הצגת הוצאות ל-12 חודשים
- [x] לשנה ספציפית
- [x] בחירת מטבע לתצוגה
- [x] המרת מטבעות

### 6. המרת מטבעות
- [x] תמיכה ב-USD, ILS, GBP, EURO
- [x] קבלת שערים מ-server (Fetch API)
- [x] שמירת מטבע מקורי בכל הוצאה
- [x] המרה דינמית בעת הצגה
- [x] עבודה גם ללא הגדרת URL מותאם אישית

### 7. מסך הגדרות
- [x] אפשרות להזין URL מותאם אישית
- [x] שמירה ב-localStorage
- [x] פורמט JSON נדרש: `{"USD":1, "GBP":0.6, "EURO":0.7, "ILS":3.4}`

### 8. ספריית idb.js
- [x] גרסה vanilla (ללא modules)
- [x] גרסה React (עם modules)
- [x] פונקציה: openCostsDB(name, version)
- [x] פונקציה: addCost(cost)
- [x] פונקציה: getReport(year, month, currency)
- [x] כל הפונקציות מחזירות Promise

### 9. ממשק משתמש
- [x] שימוש ב-React
- [x] שימוש ב-MUI (Material-UI)
- [x] תואם לדפדפני desktop

### 10. פריסה באינטרנט
- [ ] פרוס על שרת מחובר לאינטרנט (render.com / netlify / vercel)
- [ ] קובץ JSON של שערי חליפין פרוס ונגיש
- [ ] האפליקציה עובדת ב-Google Chrome
- [ ] יש URL לאפליקציה

## קבצים להגשה

### קובץ 1: PDF
- [ ] כולל את כל קבצי הקוד
- [ ] שם הקובץ: firstname_lastname.pdf (אותיות קטנות)
- [ ] שם מנהל הצוות בראש הקובץ
- [ ] פרטים של כל חברי הצוות (שם + ת.ז + טלפון + מייל)
- [ ] קישור לסרטון יוטיוב (unlisted)
- [ ] תיאור כלי שיתוף פעולה (עד 100 מילים)
- [ ] לכל קובץ - שם הקובץ מופיע ליד הקוד
- [ ] השורות לא נשברות

### קובץ 2: idb.js (vanilla)
- [ ] הגרסה הוונילי של idb.js
- [ ] ללא import/export
- [ ] מוסיף את idb לאובייקט הגלובלי
- [ ] עובד עם הקוד לדוגמה שבמסמך

### קובץ 3: ZIP
- [ ] כולל את כל הפרויקט
- [ ] ללא תיקיית node_modules
- [ ] כולל package.json
- [ ] כולל את כל קבצי המקור

### קובץ 4: סרטון (YouTube)
- [ ] אורך: עד 60 שניות
- [ ] uploaded as "unlisted"
- [ ] מראה את האפליקציה רצה
- [ ] מראה את כל הפיצ'רים

## סגנון קוד

- [ ] עוקב אחרי style guide: http://www.abelski.com/courses/stylejs/languagerules.pdf
- [ ] יש הערות בקוד
- [ ] שמות משתנים ברורים
- [ ] פונקציות מתועדות

## בדיקות פונקציונליות

### בדיקה 1: הוספת הוצאה
1. [ ] פתח את האפליקציה
2. [ ] עבור ל-"Add Cost"
3. [ ] הזן: 200 USD, FOOD, "Pizza"
4. [ ] שמור
5. [ ] ודא הודעת הצלחה

### בדיקה 2: דוח חודשי
1. [ ] עבור ל-"Monthly Report"
2. [ ] בחר חודש ושנה נוכחיים
3. [ ] בחר USD
4. [ ] לחץ "Get Report"
5. [ ] ודא שההוצאה מהבדיקה 1 מופיעה

### בדיקה 3: תרשים עוגה
1. [ ] עבור ל-"Pie Chart"
2. [ ] בחר חודש ושנה נוכחיים
3. [ ] בחר USD
4. [ ] לחץ "Get Chart"
5. [ ] ודא שהתרשים מוצג

### בדיקה 4: תרשים עמודות
1. [ ] עבור ל-"Bar Chart"
2. [ ] בחר שנה נוכחית
3. [ ] בחר USD
4. [ ] לחץ "Get Chart"
5. [ ] ודא שהתרשים מוצג

### בדיקה 5: המרת מטבעות
1. [ ] הוסף הוצאה: 100 GBP
2. [ ] בדוח חודשי, בחר USD
3. [ ] ודא שהסכום הומר (צריך להיות ~126 USD אם GBP=0.79)

### בדיקה 6: הגדרות
1. [ ] עבור ל-"Settings"
2. [ ] הזן URL של שערי חליפין
3. [ ] שמור
4. [ ] רענן את הדף
5. [ ] ודא שההגדרה נשמרה

### בדיקה 7: idb.js וונילי
1. [ ] פתח את `/test-idb.html` בדפדפן
2. [ ] ודא שכל הבדיקות עוברות
3. [ ] בדוק ב-console שאין שגיאות

## לפני ההגשה

- [ ] הרצתי `npm run build` והבנייה הצליחה
- [ ] בדקתי את האפליקציה ב-Google Chrome
- [ ] בדקתי שה-IndexedDB שומר נתונים
- [ ] בדקתי שכל התרשימים עובדים
- [ ] בדקתי שההמרות נכונות
- [ ] יצרתי סרטון והעליתי ליוטיוב
- [ ] יצרתי קובץ PDF עם כל הקוד
- [ ] העתקתי את idb.js הוונילי
- [ ] יצרתי ZIP ללא node_modules
- [ ] מילאתי את הטופס באתר הקורס

## תאריך הגשה

**Sunday, January 15 at 23:30**

זכור: המערכת מתייחסת למועד כאילו הוא 30 דקות מוקדם יותר!

---

**בהצלחה! 🎉**
