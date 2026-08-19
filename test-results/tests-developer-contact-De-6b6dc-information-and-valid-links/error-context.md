# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\developer-contact.spec.ts >> Developer Contact Section >> should display developer information and valid links
- Location: tests\developer-contact.spec.ts:8:7

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
  3  | test.describe('Developer Contact Section', () => {
  4  |   test.beforeEach(async ({ page }) => {
> 5  |     await page.goto('/');
     |                ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  6  |   });
  7  | 
  8  |   test('should display developer information and valid links', async ({ page }) => {
  9  |     // Scroll to the bottom to ensure the section is visible
  10 |     await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  11 |     
  12 |     const contactSection = page.locator('text="CONTACT DEVELOPER FOR FURTHER INFORMATION ABOUT PROJECT"').locator('..');
  13 |     
  14 |     // Verify developer name is present
  15 |     await expect(contactSection.locator('text="Nallana Sasi Kumar"')).toBeVisible();
  16 | 
  17 |     // Verify all 4 links are present and have correct attributes
  18 |     
  19 |     // 1. Resume
  20 |     const resumeLink = page.locator('a', { hasText: 'Resume (PDF)' });
  21 |     await expect(resumeLink).toBeVisible();
  22 |     await expect(resumeLink).toHaveAttribute('href', '/resume.pdf');
  23 |     await expect(resumeLink).toHaveAttribute('target', '_blank');
  24 | 
  25 |     // 2. Email
  26 |     const emailLink = page.locator('a', { hasText: 'sasikumarnallana956@gmail.com' });
  27 |     await expect(emailLink).toBeVisible();
  28 |     await expect(emailLink).toHaveAttribute('href', 'mailto:sasikumarnallana956@gmail.com');
  29 | 
  30 |     // 3. LinkedIn
  31 |     const linkedinLink = page.locator('a', { hasText: 'LinkedIn Profile' });
  32 |     await expect(linkedinLink).toBeVisible();
  33 |     await expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/sasikumar-nallana');
  34 |     await expect(linkedinLink).toHaveAttribute('target', '_blank');
  35 | 
  36 |     // 4. GitHub
  37 |     const githubLink = page.locator('a', { hasText: 'GitHub Profile' });
  38 |     await expect(githubLink).toBeVisible();
  39 |     await expect(githubLink).toHaveAttribute('href', 'https://github.com/kumarnallana');
  40 |     await expect(githubLink).toHaveAttribute('target', '_blank');
  41 |     
  42 |     // Verify no placeholder '#' links exist in the developer contact section
  43 |     const allLinks = await contactSection.locator('a').all();
  44 |     for (const link of allLinks) {
  45 |       const href = await link.getAttribute('href');
  46 |       expect(href).not.toBe('#');
  47 |     }
  48 |   });
  49 | });
  50 | 
```