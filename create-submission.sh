#!/bin/bash

# Script to create submission files for Cost Manager project
# Run this script before submitting your project

echo "=========================================="
echo "Cost Manager - Creating Submission Files"
echo "=========================================="
echo ""

# Step 1: Clean up
echo "Step 1: Cleaning up..."
rm -rf node_modules
rm -f project.zip
rm -f package-lock.json
echo "✓ Cleaned node_modules and old files"
echo ""

# Step 2: Create ZIP file
echo "Step 2: Creating ZIP file..."
zip -r project.zip . -x "*.git*" -x "node_modules/*" -x "dist/*" -x "*.zip"
echo "✓ Created project.zip"
echo ""

# Step 3: Copy vanilla idb.js
echo "Step 3: Copying vanilla idb.js..."
cp public/idb.js idb.js
echo "✓ Copied idb.js to root directory"
echo ""

# Step 4: Verify files
echo "Step 4: Verifying submission files..."
if [ -f "project.zip" ]; then
    echo "✓ project.zip exists"
else
    echo "✗ project.zip missing!"
fi

if [ -f "idb.js" ]; then
    echo "✓ idb.js exists"
else
    echo "✗ idb.js missing!"
fi
echo ""

# Step 5: Reminder
echo "=========================================="
echo "Submission Files Ready!"
echo "=========================================="
echo ""
echo "Files created:"
echo "  1. project.zip - Complete project (without node_modules)"
echo "  2. idb.js - Vanilla version for testing"
echo ""
echo "Still need to create:"
echo "  3. PDF file with all code (firstname_lastname.pdf)"
echo "     - Include team member details"
echo "     - Include YouTube video link"
echo "     - Include collaboration tools summary (100 words)"
echo ""
echo "Before submitting:"
echo "  [ ] Deploy rates.json to a public URL"
echo "  [ ] Update DEFAULT_RATES_URL in src/services/CurrencyService.js"
echo "  [ ] Deploy app to Render.com/Netlify"
echo "  [ ] Create video (max 60 seconds, unlisted)"
echo "  [ ] Create PDF with all code"
echo "  [ ] Test everything in Google Chrome"
echo ""
echo "Submit to Moodle:"
echo "  - PDF file"
echo "  - idb.js file"
echo "  - project.zip file"
echo ""
echo "Good luck! 🎉"
