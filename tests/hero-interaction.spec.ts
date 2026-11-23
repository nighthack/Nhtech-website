import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page, isMobile }) => {
  await page.addInitScript((theme) => localStorage.setItem('nhtech-theme', theme), isMobile ? 'light' : 'dark');
});

test('starts even when the animation loads before hydration', async ({ page }) => {
  let releaseHydration!: () => void;
  const hydrationGate = new Promise<void>((resolve) => { releaseHydration = resolve; });
  await page.route('**/assets/index-*.js', async (route) => {
    await hydrationGate;
    await route.continue();
  });
  const navigation = page.goto('/', { waitUntil: 'domcontentloaded' });
  const animation = page.frameLocator('.hero-model-animation iframe');
  try {
    // The child has sent its initial ready message while the parent is not listening.
    await expect(animation.locator('#scene')).toBeVisible();
    await expect.poll(() => animation.locator('body').evaluate(() => document.readyState)).toBe('complete');
    await expect(animation.locator('html')).not.toHaveAttribute('data-running');
  } finally {
    releaseHydration();
  }
  await navigation;
  await expect(animation.locator('html')).toHaveAttribute('data-running');
  const timeline = await animation.locator('#scene').evaluate((svg) => (svg as SVGSVGElement).getCurrentTime());
  await expect.poll(() => animation.locator('#scene').evaluate((svg) => (svg as SVGSVGElement).getCurrentTime())).toBeGreaterThan(timeline);
});

test('responds to clicks or taps and preserves touch scrolling and controls', async ({ page, isMobile }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  const animation = page.frameLocator('.hero-model-animation iframe');
  await expect(animation.locator('html')).toHaveAttribute('data-running');
  const before = await animation.locator('#fx > circle').count();
  if (isMobile) await page.touchscreen.tap(300, 380);
  else await page.mouse.click(1100, 300);
  await expect(animation.locator('#fx > circle')).toHaveCount(before + 1);
  await expect(animation.locator('#fx > g')).toHaveCount(3);

  if (isMobile) {
    const session = await page.context().newCDPSession(page);
    const x = page.viewportSize()!.width - 8;
    await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y: 620 }] });
    for (let y = 580; y >= 220; y -= 40) {
      await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y }] });
      await page.waitForTimeout(20);
    }
    await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
    await session.detach();
  }

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.getByRole('button', { name: 'Vision & edge AI', exact: true }).click();
  await expect(page.locator('#hero-system-readout').getByRole('heading', { name: 'Vision & edge AI', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Pause backgrounds', exact: true }).click();
  await expect(animation.locator('html')).not.toHaveAttribute('data-running');
  await page.locator('.home-hero h1').scrollIntoViewIfNeeded();
  const heading = await page.locator('.home-hero h1').boundingBox();
  if (!heading) throw new Error('Hero heading is not visible');
  const point = { x: heading.x + heading.width / 2, y: heading.y + heading.height / 2 };
  const pausedCount = await animation.locator('#fx > circle').count();
  if (isMobile) await page.touchscreen.tap(point.x, point.y);
  else await page.mouse.click(point.x, point.y);
  expect(await animation.locator('#fx > circle').count()).toBe(pausedCount);
  await page.getByRole('button', { name: 'Play backgrounds', exact: true }).click();
  await expect(animation.locator('html')).toHaveAttribute('data-running');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(animation.locator('html')).toHaveAttribute('data-reduced');
  await expect(animation.locator('html')).not.toHaveAttribute('data-running');
  await expect(page.getByRole('button', { name: 'Pause backgrounds', exact: true })).toHaveCount(0);
  await page.locator('.home-hero').getByRole('button', { name: 'See our work', exact: true }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.getByRole('heading', { name: 'Our work', exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test('resynchronises after an iframe reload and stops offscreen', async ({ page }) => {
  await page.goto('/');
  const iframe = await page.locator('.hero-model-animation iframe').elementHandle();
  const frame = await iframe?.contentFrame();
  if (!frame) throw new Error('The hero iframe did not load');
  await expect(frame.locator('html')).toHaveAttribute('data-running');
  await frame.goto(frame.url());
  await expect(frame.locator('html')).toHaveAttribute('data-running');

  const previousTheme = await page.locator('html').getAttribute('data-theme');
  const nextTheme = previousTheme === 'light' ? 'dark' : 'light';
  await page.getByRole('button', { name: `Switch to ${nextTheme} mode`, exact: true }).click();
  await expect(frame.locator('html')).toHaveAttribute('data-theme', nextTheme);
  await page.evaluate(() => window.scrollTo({ top: document.querySelector('.home-hero')!.getBoundingClientRect().height + 100, behavior: 'instant' }));
  await expect(frame.locator('html')).not.toHaveAttribute('data-running');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect(frame.locator('html')).toHaveAttribute('data-running');
});
