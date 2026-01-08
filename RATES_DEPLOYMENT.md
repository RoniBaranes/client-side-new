# How to Deploy Exchange Rates JSON

## Option 1: GitHub Raw Content (Recommended - Free & Easy)

### Step 1: Create a New Repository

1. Go to https://github.com and sign in
2. Click the "+" icon → "New repository"
3. Name it: `exchange-rates`
4. Make it **Public**
5. Check "Add a README file"
6. Click "Create repository"

### Step 2: Upload rates.json

1. In your new repository, click "Add file" → "Create new file"
2. Name it: `rates.json`
3. Paste this content:

```json
{
  "USD": 1,
  "GBP": 0.79,
  "EURO": 0.92,
  "ILS": 3.65
}
```

4. Click "Commit new file"

### Step 3: Get the Raw URL

1. Click on `rates.json` in your repository
2. Click the "Raw" button
3. Copy the URL from the address bar

The URL format will be:
```
https://raw.githubusercontent.com/YOUR_USERNAME/exchange-rates/main/rates.json
```

### Step 4: Update Your Code

Open `src/services/CurrencyService.js` and update:

```javascript
export const DEFAULT_RATES_URL =
  "https://raw.githubusercontent.com/YOUR_USERNAME/exchange-rates/main/rates.json";
```

### Step 5: Test

1. Rebuild your app: `npm run build`
2. Test that exchange rates are loading
3. Check the browser console for errors

---

## Option 2: GitHub Pages

### Step 1: Create Repository (same as above)

### Step 2: Enable GitHub Pages

1. Go to repository Settings
2. Scroll to "Pages" section
3. Under "Source", select "main" branch
4. Click "Save"

### Step 3: Add CORS Headers

Create a file named `_headers` with:

```
/*
  Access-Control-Allow-Origin: *
```

### Step 4: Your URL

```
https://YOUR_USERNAME.github.io/exchange-rates/rates.json
```

---

## Option 3: Cloudflare Pages (Free)

1. Sign up at https://pages.cloudflare.com
2. Connect your GitHub repository
3. Deploy
4. Get your URL: `https://exchange-rates.pages.dev/rates.json`

---

## Option 4: Vercel (Free)

1. Sign up at https://vercel.com
2. Import your GitHub repository
3. Deploy
4. Get your URL: `https://your-project.vercel.app/rates.json`

---

## Option 5: Netlify (Free)

1. Sign up at https://netlify.com
2. Drag and drop a folder with `rates.json`
3. Get your URL: `https://your-site.netlify.app/rates.json`

---

## Testing Your Deployed Rates

### Using Browser

Open the URL in your browser. You should see:

```json
{
  "USD": 1,
  "GBP": 0.79,
  "EURO": 0.92,
  "ILS": 3.65
}
```

### Using Command Line

```bash
curl https://your-rates-url.com/rates.json
```

### Using JavaScript Console

```javascript
fetch('https://your-rates-url.com/rates.json')
  .then(r => r.json())
  .then(data => console.log(data));
```

---

## Common Issues

### Issue: CORS Error

**Error**: `Access to fetch at '...' from origin '...' has been blocked by CORS policy`

**Solution**:
- For GitHub Raw: This should work automatically
- For GitHub Pages: Add `_headers` file
- For other hosts: Check CORS configuration

### Issue: 404 Not Found

**Error**: `Failed to fetch: 404`

**Solution**:
- Check the URL is correct
- Make sure the repository is public
- Wait a few minutes for deployment

### Issue: Invalid JSON

**Error**: `Unexpected token < in JSON`

**Solution**:
- Make sure you're using the "Raw" URL on GitHub
- Check the JSON format is correct

---

## Updating Exchange Rates

To update the rates:

1. Go to your GitHub repository
2. Click on `rates.json`
3. Click the pencil icon (Edit)
4. Update the values
5. Commit changes

The changes will be live immediately (for Raw URLs).

---

## Current Exchange Rates (Example)

As of January 2026:

- USD: 1 (base currency)
- GBP: ~0.79 (1 GBP = 1.27 USD)
- EURO: ~0.92 (1 EUR = 1.09 USD)
- ILS: ~3.65 (1 USD = 3.65 ILS)

**Note**: These are example rates. Update with real rates if needed!

---

## Security Note

The rates.json file is public. This is fine for a course project.

For production apps, you would:
- Use a real exchange rate API (e.g., exchangerate-api.com)
- Add authentication
- Cache rates server-side

---

**Need Help?**

Post your question in the course forum!
