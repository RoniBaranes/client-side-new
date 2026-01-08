# Cost Manager - Deployment Guide

## קובץ זה מיועד למגישי הפרויקט

### שלב 1: העלאת קובץ Exchange Rates

לפני שתפרוס את האפליקציה, עליך להעלות את קובץ ה-`rates.json` לשרת:

#### אופציה 1: GitHub Pages (מומלץ)

1. צור repository חדש בגיטהאב בשם `exchange-rates`
2. העלה את הקובץ [public/rates.json](public/rates.json)
3. ה-URL שלך יהיה:
   ```
   https://raw.githubusercontent.com/YOUR_USERNAME/exchange-rates/main/rates.json
   ```

#### אופציה 2: כל שרת סטטי אחר

העלה את הקובץ לכל שרת שתרצה ווודא שיש CORS headers.

### שלב 2: עדכון ה-URL בקוד

עדכן את הקובץ [src/services/CurrencyService.js](src/services/CurrencyService.js):

```javascript
export const DEFAULT_RATES_URL = "YOUR_ACTUAL_URL_HERE";
```

### שלב 3: פריסת האפליקציה ל-Render.com

1. הירשם ל-[Render.com](https://render.com)
2. לחץ על "New +" ובחר "Static Site"
3. חבר את ה-GitHub repository שלך
4. הגדרות:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. לחץ על "Create Static Site"

ההפצה תקח כמה דקות. בסוף תקבל URL כמו:
```
https://your-app-name.onrender.com
```

### שלב 4: בדיקת האפליקציה

1. פתח את ה-URL של האפליקציה
2. בדוק שכל הפיצ'רים עובדים:
   - ✅ הוספת הוצאה
   - ✅ דוח חודשי
   - ✅ תרשים עוגה
   - ✅ תרשים עמודות
   - ✅ הגדרות

### שלב 5: בדיקת idb.js הוונילי

פתח את הקובץ:
```
https://your-app-name.onrender.com/test-idb.html
```

ווודא שכל הבדיקות עברו בהצלחה.

### שלב 6: הכנת קבצים להגשה

1. **קובץ PDF** - צור PDF עם כל קבצי הקוד
2. **קובץ idb.js** - העתק את [public/idb.js](public/idb.js)
3. **קובץ ZIP** - דחוס את כל הפרויקט (מחק את node_modules לפני!)

```bash
# Linux/Mac
rm -rf node_modules
zip -r project.zip .

# Windows PowerShell
Remove-Item -Recurse -Force node_modules
Compress-Archive -Path * -DestinationPath project.zip
```

### מידע נוסף להגשה

בתחילת קובץ ה-PDF, כלול:

1. שם מלא של מנהל הצוות
2. שם + מספר זהות + טלפון + אימייל של כל חבר צוות
3. קישור לסרטון ביוטיוב (unlisted)
4. קישור לאפליקציה החיה
5. תיאור קצר של כלי שיתוף פעולה ששימשו (עד 100 מילים)

### טיפים חשובים

- ✅ ודא שהאפליקציה עובדת ב-Google Chrome
- ✅ בדוק שהמטבעות מומרים נכון
- ✅ ודא ש-IndexedDB שומר את המידע
- ✅ בדוק שכל התרשימים מוצגים כראוי
- ✅ ודא שה-idb.js הוונילי עובד עצמאית

### פתרון בעיות נפוצות

**בעיה**: Exchange rates לא נטענים
**פתרון**: ודא שה-URL נכון ויש CORS headers

**בעיה**: התרשימים לא מוצגים
**פתרון**: ודא ש-Chart.js נטען כראוי ויש data

**בעיה**: IndexedDB לא שומר
**פתרון**: בדוק את ה-console לשגיאות

### צור קשר

אם יש שאלות, פרסם בפורום הקורס.

---

**בהצלחה! 🎉**
