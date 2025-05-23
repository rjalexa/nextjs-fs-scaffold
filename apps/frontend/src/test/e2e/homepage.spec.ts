import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load and display the main content', async ({ page }) => {
    await page.goto('/');

    // Check if the page title is correct
    await expect(page).toHaveTitle(/Next.js Full-Stack Scaffold/);

    // Check if the main heading is visible
    await expect(page.locator('h1')).toContainText('Next.js Full-Stack Scaffold');

    // Check if the description is visible
    await expect(page.locator('text=A production-ready scaffold')).toBeVisible();

    // Check if the technology cards are visible
    await expect(page.locator('[data-testid="tech-card"]')).toHaveCount(3);
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');

    // Check if navigation elements are present
    // This would depend on your actual navigation structure
    // await expect(page.locator('nav')).toBeVisible();
  });

  test('should be responsive', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();

    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('h1')).toBeVisible();

    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should have proper accessibility', async ({ page }) => {
    await page.goto('/');

    // Check for proper heading hierarchy
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // Check for alt text on images
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });
});
