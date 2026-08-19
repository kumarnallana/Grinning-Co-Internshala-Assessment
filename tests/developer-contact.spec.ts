import { test, expect } from '@playwright/test';

test.describe('Developer Contact Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('should display developer information and valid links', async ({ page }) => {
    // Scroll to the bottom to ensure the section is visible
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    const contactSection = page.locator('text="CONTACT DEVELOPER FOR FURTHER INFORMATION ABOUT PROJECT"').locator('..');
    
    // Verify developer name is present
    await expect(contactSection.locator('text="Nallana Sasi Kumar"')).toBeVisible();

    // Verify all 4 links are present and have correct attributes
    
    // 1. Resume
    const resumeLink = page.locator('a', { hasText: 'Resume (PDF)' });
    await expect(resumeLink).toBeVisible();
    await expect(resumeLink).toHaveAttribute('href', '/resume.pdf');
    await expect(resumeLink).toHaveAttribute('target', '_blank');

    // 2. Email
    const emailLink = page.locator('a', { hasText: 'sasikumarnallana956@gmail.com' });
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute('href', 'mailto:sasikumarnallana956@gmail.com');

    // 3. LinkedIn
    const linkedinLink = page.locator('a', { hasText: 'LinkedIn Profile' });
    await expect(linkedinLink).toBeVisible();
    await expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/sasikumar-nallana');
    await expect(linkedinLink).toHaveAttribute('target', '_blank');

    // 4. GitHub
    const githubLink = page.locator('a', { hasText: 'GitHub Profile' });
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/kumarnallana');
    await expect(githubLink).toHaveAttribute('target', '_blank');
    
    // Verify no placeholder '#' links exist in the developer contact section
    const allLinks = await contactSection.locator('a').all();
    for (const link of allLinks) {
      const href = await link.getAttribute('href');
      expect(href).not.toBe('#');
    }
  });
});
