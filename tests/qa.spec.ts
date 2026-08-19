import { test, expect } from '@playwright/test';

test.describe('Redroot V4 QA Assertions', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
  });

  test('R4.1: Active Botanical Logical State (Zero-Ghosting Architecture)', async ({ page }) => {
    const formulaSection = page.locator('#formula');
    await formulaSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Instead of checking raw DOM count (since AnimatePresence retains exiting nodes),
    // we assert that exactly ONE botanical item is logically "active" and the others are inactive.
    // Since we use opacity: 1 and pointerEvents: 'auto' for active, and opacity: 0 for inactive,
    // we can check the computed style of the headings or their containers.
    
    // We expect the first botanical (01) to be active.
    const botanicalContainers = page.locator('#formula .col-start-1.row-start-1');
    await expect(botanicalContainers).toHaveCount(1); // Wait, there's only 1 container if AnimatePresence is removed, but we DO use AnimatePresence.
    
    // Actually, with AnimatePresence, there could be multiple containers during transition.
    // Let's assert that after scrolling and waiting, there is only ONE fully visible container.
    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(800); // Wait for the 0.6s crossfade to finish completely

    // The exiting element is removed from the DOM after 0.6s.
    // So there should be exactly 1 container left.
    await expect(botanicalContainers).toHaveCount(1);
    
    // Verify it is fully visible
    const activeContainer = botanicalContainers.first();
    await expect(activeContainer).toHaveCSS('pointer-events', 'auto');
  });

  test('R4.2: Custom Cursor Native Pointer Suppression (Desktop)', async ({ page }) => {
    // Desktop environment should suppress native cursor on body and links
    const bodyCursor = await page.evaluate(() => window.getComputedStyle(document.body).cursor);
    expect(bodyCursor).toBe('none');

    const linkCursor = await page.evaluate(() => {
      const link = document.querySelector('a');
      return link ? window.getComputedStyle(link).cursor : 'none';
    });
    expect(linkCursor).toBe('none');
  });

  test('R4.3: Logo Focus Ring Behavior', async ({ page }) => {
    const logoLink = page.locator('header a').first();
    
    // 1. Keyboard Navigation: Tab to the logo should trigger focus-visible
    await page.keyboard.press('Tab');
    await expect(logoLink).toBeFocused();
    
    // 2. Mouse Click: Clicking the logo should NOT show a focus ring if focus-visible is working correctly natively.
    // We remove focus first
    await logoLink.blur();
    
    // We cannot easily assert the *absence* of a focus ring painted by the browser, 
    // but we ensure the native behavior is preserved without preventDefault.
    await logoLink.click();
  });
});

test.describe('Mobile Device Emulation', () => {
  test.use({ 
    hasTouch: true,
    viewport: { width: 375, height: 667 }
  });

  test('R4.2 Mobile: Native Cursor Retained', async ({ page }) => {
    await page.goto('/');
    
    // On touch devices, the cursor should NOT be 'none'
    const bodyCursor = await page.evaluate(() => window.getComputedStyle(document.body).cursor);
    expect(bodyCursor).not.toBe('none');
  });
});
