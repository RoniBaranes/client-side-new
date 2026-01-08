# PowerShell Script to create submission files for Cost Manager project
# Run this script before submitting your project

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Cost Manager - Creating Submission Files" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Clean up
Write-Host "Step 1: Cleaning up..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
}
if (Test-Path "project.zip") {
    Remove-Item "project.zip"
}
if (Test-Path "package-lock.json") {
    Remove-Item "package-lock.json"
}
Write-Host "✓ Cleaned node_modules and old files" -ForegroundColor Green
Write-Host ""

# Step 2: Create ZIP file
Write-Host "Step 2: Creating ZIP file..." -ForegroundColor Yellow
$exclude = @("node_modules", "dist", ".git", "*.zip")
$files = Get-ChildItem -Path . -Recurse | Where-Object {
    $item = $_
    -not ($exclude | Where-Object { $item.FullName -like "*$_*" })
}
Compress-Archive -Path * -DestinationPath project.zip -Force
Write-Host "✓ Created project.zip" -ForegroundColor Green
Write-Host ""

# Step 3: Copy vanilla idb.js
Write-Host "Step 3: Copying vanilla idb.js..." -ForegroundColor Yellow
Copy-Item "public\idb.js" "idb.js"
Write-Host "✓ Copied idb.js to root directory" -ForegroundColor Green
Write-Host ""

# Step 4: Verify files
Write-Host "Step 4: Verifying submission files..." -ForegroundColor Yellow
if (Test-Path "project.zip") {
    Write-Host "✓ project.zip exists" -ForegroundColor Green
} else {
    Write-Host "✗ project.zip missing!" -ForegroundColor Red
}

if (Test-Path "idb.js") {
    Write-Host "✓ idb.js exists" -ForegroundColor Green
} else {
    Write-Host "✗ idb.js missing!" -ForegroundColor Red
}
Write-Host ""

# Step 5: Reminder
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Submission Files Ready!" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Files created:" -ForegroundColor White
Write-Host "  1. project.zip - Complete project (without node_modules)" -ForegroundColor White
Write-Host "  2. idb.js - Vanilla version for testing" -ForegroundColor White
Write-Host ""
Write-Host "Still need to create:" -ForegroundColor Yellow
Write-Host "  3. PDF file with all code (firstname_lastname.pdf)" -ForegroundColor White
Write-Host "     - Include team member details" -ForegroundColor Gray
Write-Host "     - Include YouTube video link" -ForegroundColor Gray
Write-Host "     - Include collaboration tools summary (100 words)" -ForegroundColor Gray
Write-Host ""
Write-Host "Before submitting:" -ForegroundColor Yellow
Write-Host "  [ ] Deploy rates.json to a public URL" -ForegroundColor White
Write-Host "  [ ] Update DEFAULT_RATES_URL in src/services/CurrencyService.js" -ForegroundColor White
Write-Host "  [ ] Deploy app to Render.com/Netlify" -ForegroundColor White
Write-Host "  [ ] Create video (max 60 seconds, unlisted)" -ForegroundColor White
Write-Host "  [ ] Create PDF with all code" -ForegroundColor White
Write-Host "  [ ] Test everything in Google Chrome" -ForegroundColor White
Write-Host ""
Write-Host "Submit to Moodle:" -ForegroundColor Yellow
Write-Host "  - PDF file" -ForegroundColor White
Write-Host "  - idb.js file" -ForegroundColor White
Write-Host "  - project.zip file" -ForegroundColor White
Write-Host ""
Write-Host "Good luck! 🎉" -ForegroundColor Green
