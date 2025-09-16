import { test, expect } from '@playwright/test';

const routes = [
  { path: '/', text: 'Live Quizr' },
  { path: '/about', text: 'About Live Quizr' },
  { path: '/events', text: 'Events' },
  { path: '/demo', text: 'Demo Mode' },
  { path: '/host/demo', text: 'Host Console' },
  { path: '/display/demo', text: 'Leaderboard' },
  { path: '/join/demo', text: 'Join Event' },
  { path: '/admin', text: 'Admin Dashboard' },
];

test.describe('Top navigation and direct routes', () => {
  for (const r of routes) {
    test(`navigates to ${r.path}`, async ({ page }) => {
      await page.goto(r.path);
      await expect(page.getByText(new RegExp(r.text, 'i'))).toBeVisible();
    });
  }

  test('header links navigate between pages', async ({ page }) => {
    await page.goto('/');
    const linkTexts = ['About', 'Events', 'Demo Mode', 'Admin'];
    for (const label of linkTexts) {
      await page.getByRole('link', { name: new RegExp(label, 'i') }).click();
      await expect(page).toHaveURL(new RegExp(`/${label.split(' ')[0].toLowerCase()}`));
    }
  });
});
