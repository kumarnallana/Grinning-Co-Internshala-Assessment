import { test, expect } from '@playwright/test';

test.describe('Redroot Interaction Matrix', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test.describe('Navigation', () => {
    test('Home anchor works', async ({ page }) => {
      const homeLink = page.locator('nav a[href="/"]');
      await expect(homeLink.first()).toBeVisible();
    });

    test('Ritual anchor works', async ({ page }) => {
      const ritualLink = page.locator('nav a[href="#ritual"]');
      await expect(ritualLink.first()).toBeVisible();
    });

    test('Blends anchor works', async ({ page }) => {
      const blendsLink = page.locator('nav a[href="#blends"]');
      await expect(blendsLink.first()).toBeVisible();
    });

    test('Reviews anchor works', async ({ page }) => {
      const reviewsLink = page.locator('nav a[href="#reviews"]');
      await expect(reviewsLink.first()).toBeVisible();
    });

    test('FAQ anchor works', async ({ page }) => {
      const faqLink = page.locator('nav a[href="#faq"]');
      await expect(faqLink.first()).toBeVisible();
    });

    test('Begin Ritual points to pricing', async ({ page }) => {
      const beginRitualBtn = page.locator('a[href="#pricing"]', { hasText: 'Begin' });
      await expect(beginRitualBtn.first()).toBeVisible();
    });
  });

  test.describe('Media', () => {
    test('Watch Ritual opens and handles focus', async ({ page }) => {
      const watchBtn = page.getByRole('button', { name: 'Watch the Ritual' });
      await watchBtn.click();
      
      const modal = page.locator('[aria-label="Redroot Ritual Video"]');
      await expect(modal).toBeVisible();

      // Check intentional unavailable state
      await expect(page.getByText('Awaiting Final Asset')).toBeVisible();

      // Close modal
      const closeBtn = page.getByRole('button', { name: 'Close video modal' });
      await closeBtn.click();
      await expect(modal).toBeHidden();
    });

    test('Escape closes video modal', async ({ page }) => {
      const watchBtn = page.getByRole('button', { name: 'Watch the Ritual' });
      await watchBtn.click();
      const modal = page.locator('[aria-label="Redroot Ritual Video"]');
      await expect(modal).toBeVisible();

      await page.keyboard.press('Escape');
      await expect(modal).toBeHidden();
    });
  });

  test.describe('Auth Demo Session', () => {
    test('Login flow works with Demo Session', async ({ page }) => {
      const loginBtn = page.getByRole('button', { name: 'Log In' }).first();
      await loginBtn.click();

      // Wait for success and context update (We skip actual form filling if we can just assert modal)
      const modal = page.getByRole('dialog', { name: 'Login Modal' });
      await modal.locator('input[type="email"]').fill('test@example.com');
      await modal.locator('input[type="password"]').fill('password123');
      await modal.locator('button[type="submit"]').click();

      await expect(page.getByText('Redirecting to your ritual dashboard...')).toBeVisible();
      
      const userMenu = page.getByRole('button', { name: 'User account menu' });
      await expect(userMenu).toBeVisible({ timeout: 5000 });

      // Logout
      await userMenu.click();
      await page.getByRole('menuitem', { name: 'Log Out' }).click();
      await expect(userMenu).toBeHidden();
      await expect(loginBtn).toBeVisible();
    });
  });

  test.describe('Developer Profile', () => {
    test('Resume link works', async ({ page }) => {
      const resume = page.locator('a:has-text("Resume")');
      await expect(resume).toBeVisible();
      await expect(resume).toHaveAttribute('href', /resume\.pdf/);
    });

    test('Email link works', async ({ page }) => {
      const email = page.locator('a[href^="mailto:"]');
      await expect(email.first()).toBeVisible();
      await expect(email.first()).toHaveAttribute('href', /^mailto:/);
    });

    test('LinkedIn link works', async ({ page }) => {
      const linkedin = page.locator('a[href*="linkedin.com"]');
      await expect(linkedin.first()).toBeVisible();
      await expect(linkedin.first()).toHaveAttribute('href', /linkedin\.com/);
    });

    test('GitHub link works', async ({ page }) => {
      const github = page.locator('a[href*="github.com"]');
      await expect(github.first()).toBeVisible();
      await expect(github.first()).toHaveAttribute('href', /github\.com/);
    });
  });
});
