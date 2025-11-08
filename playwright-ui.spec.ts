import { test, expect } from '@playwright/test';

test('library scanner theme reflects modern library aesthetic', async ({ page }) => {
  await page.goto('file:///c:/Users/hamza/Documents/Scanner/scanner1.1.html');
  await expect(page.getByRole('heading', { level: 1, name: 'Library Scanner' })).toBeVisible();
  const theme = await page.evaluate(() => {
    const style = getComputedStyle(document.documentElement);
    return {
      primary: style.getPropertyValue('--primary').trim(),
      accent: style.getPropertyValue('--accent').trim(),
      text: style.getPropertyValue('--text').trim()
    };
  });
  expect(theme.primary).toBe('#2e5c4f');
  expect(theme.accent).toBe('#c7852d');
  expect(theme.text).toBe('#1d2626');
  await expect(page.getByRole('radio', { name: 'Check Out' })).toBeChecked();
  await expect(page.locator('#checkinOptions')).toBeHidden();
  await page.getByRole('button', { name: '➕ Add Book' }).click();
  const gradientBackground = await page.getByRole('button', { name: '📚 Save' }).evaluate(element => getComputedStyle(element).backgroundImage);
  expect(gradientBackground).toContain('linear-gradient');
});
