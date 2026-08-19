const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
  
  await page.goto('http://localhost:3000');
  
  await page.waitForTimeout(2000);
  
  const formulaCount = await page.locator('#formula').count();
  console.log('formula count:', formulaCount);
  if (formulaCount > 0) {
    const isVisible = await page.locator('#formula').isVisible();
    console.log('formula visible:', isVisible);
    const box = await page.locator('#formula').boundingBox();
    console.log('formula bounding box:', box);
  }
  
  const logoCount = await page.locator('header a').count();
  console.log('logo count:', logoCount);
  if (logoCount > 0) {
    const isVisible = await page.locator('header a').first().isVisible();
    console.log('logo visible:', isVisible);
    const box = await page.locator('header a').first().boundingBox();
    console.log('logo bounding box:', box);
  }
  
  await browser.close();
})();
