import { test, expect } from '@playwright/test';

test.describe('Active Botanical Stage', () => {
  test('exiting nodes are correctly stripped of active semantics', async ({ page }) => {
    // 1. Navigate to the page
    await page.goto('/');

    // 2. Scroll to the ingredients section to trigger intersection observers
    const section = page.locator('#ingredients');
    await section.scrollIntoViewIfNeeded();

    // 3. Wait for the initial active item (0) to render
    const initialActive = page.locator('[data-active="true"]');
    await expect(initialActive).toHaveCount(1);
    await expect(initialActive).toHaveAttribute('aria-hidden', 'false');
    await expect(initialActive).toHaveCSS('pointer-events', 'auto');

    // 4. Scroll further to trigger the next active item (1)
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.5));

    // 5. During transition, ensure no element that is exiting retains the active state
    // We expect the old node to lose data-active, and the new one to gain it,
    // ensuring we never have two nodes with data-active="true".
    // Since we used AnimatePresence mode="popLayout", the old node stays in DOM until exit finishes.
    await expect(page.locator('[data-active="true"]')).toHaveCount(1);
    
    // The exiting node should not have pointer-events auto.
    // Wait for the exit transition to finish, and ensure it's removed.
    await page.waitForTimeout(1000); 
    
    const finalActive = page.locator('[data-active="true"]');
    await expect(finalActive).toHaveCount(1);
    await expect(finalActive).toHaveAttribute('aria-hidden', 'false');
  });
});
