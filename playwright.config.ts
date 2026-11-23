import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';

const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);

export default defineConfig({
  testDir: './tests',
  testMatch: 'hero-interaction.spec.ts',
  outputDir: 'test-results',
  workers: 1,
  timeout: 25_000,
  use: {
    baseURL: 'http://127.0.0.1:4194',
    actionTimeout: 5_000,
    launchOptions: { executablePath },
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } } },
    { name: 'touch', use: { ...devices['iPhone 12'], browserName: 'chromium' } },
  ],
  webServer: {
    command: 'node dist/server.cjs',
    env: { NODE_ENV: 'production', PORT: '4194' },
    url: 'http://127.0.0.1:4194/api/health',
    reuseExistingServer: false,
  },
});
