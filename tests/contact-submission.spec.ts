import { expect, test } from '@playwright/test';

test('keeps the short form and handles an HTML API response without losing the enquiry', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.locator('form [required]')).toHaveCount(3);
  await page.locator('#contact-name').fill('Test visitor');
  await page.locator('#contact-email').fill('visitor@example.com');
  await page.locator('#contact-problem').fill('A workflow we need help with');
  await page.route('**/api/contact', (route) => route.fulfill({ contentType: 'text/html', body: '<html>Frontend fallback</html>' }));
  await page.getByRole('button', { name: 'Send', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('The contact service is unavailable.');
  await expect(page.locator('#contact-problem')).toHaveValue('A workflow we need help with');

  await page.unroute('**/api/contact');
  await page.route('**/api/contact', async (route) => {
    const payload = route.request().postDataJSON();
    expect(payload.company).toBe('');
    expect(payload).not.toHaveProperty('schedulingDate');
    expect(payload).not.toHaveProperty('schedulingTime');
    await route.fulfill({ contentType: 'application/json', body: JSON.stringify({ success: true, agentProcessed: true }) });
  });
  await page.getByRole('button', { name: 'Send', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Thanks, Test visitor. We’ve received your enquiry.' })).toBeVisible();
});
