# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\ingredients.spec.ts >> Active Botanical Stage >> exiting nodes are correctly stripped of active semantics
- Location: tests\ingredients.spec.ts:4:7

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Active Botanical Stage', () => {
  4  |   test('exiting nodes are correctly stripped of active semantics', async ({ page }) => {
  5  |     // 1. Navigate to the page
> 6  |     await page.goto('/');
     |                ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  7  | 
  8  |     // 2. Scroll to the ingredients section to trigger intersection observers
  9  |     const section = page.locator('#ingredients');
  10 |     await section.scrollIntoViewIfNeeded();
  11 | 
  12 |     // 3. Wait for the initial active item (0) to render
  13 |     const initialActive = page.locator('[data-active="true"]');
  14 |     await expect(initialActive).toHaveCount(1);
  15 |     await expect(initialActive).toHaveAttribute('aria-hidden', 'false');
  16 |     await expect(initialActive).toHaveCSS('pointer-events', 'auto');
  17 | 
  18 |     // 4. Scroll further to trigger the next active item (1)
  19 |     await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.5));
  20 | 
  21 |     // 5. During transition, ensure no element that is exiting retains the active state
  22 |     // We expect the old node to lose data-active, and the new one to gain it,
  23 |     // ensuring we never have two nodes with data-active="true".
  24 |     // Since we used AnimatePresence mode="popLayout", the old node stays in DOM until exit finishes.
  25 |     await expect(page.locator('[data-active="true"]')).toHaveCount(1);
  26 |     
  27 |     // The exiting node should not have pointer-events auto.
  28 |     // Wait for the exit transition to finish, and ensure it's removed.
  29 |     await page.waitForTimeout(1000); 
  30 |     
  31 |     const finalActive = page.locator('[data-active="true"]');
  32 |     await expect(finalActive).toHaveCount(1);
  33 |     await expect(finalActive).toHaveAttribute('aria-hidden', 'false');
  34 |   });
  35 | });
  36 | 
```