import type { PlaywrightTestConfig } from '@playwright/test'
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
    globalSetup: require.resolve('./src/main/typescript/helpers/global-setup.ts'),

    /* Maximum time one test can run for. */
    timeout: 1200000,
    expect: {
        /**
         * Maximum time expect() should wait for the condition to be met.
         * For example in `await expect(locator).toHaveText();`
         */
        timeout: 5000,
    },
    /* Run tests in files in parallel */
    fullyParallel: false,

    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Disable retries to prevent infinite loops */
    retries: 1,
    /* Run with 1 worker to prevent multiple Chrome instances */
    workers: 1,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        ['html', { open: 'never', outputFolder: 'playwright-report' }],
        ['allure-playwright'],
        ['json', { outputFile: 'test-results.json' }],
        ['blob', { open: 'never' }],
    ],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
        actionTimeout: 0,
        screenshot: 'only-on-failure',
        trace: 'on', // Capture full trace with all network info
        video: 'on', // Record video for all tests
        acceptDownloads: true,
        permissions: ['clipboard-read', 'clipboard-write'],
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'mroads',
            testDir: './src/test/typescript',
            testMatch: ['vendormanagement*.spec.ts'], // Include all tests
            use: {
                channel: 'chromium',
                acceptDownloads: true,
                headless: true,
                viewport: null,
               // storageState: 'storageState.json', // ✅ ADD HERE ALSO (safe)
                launchOptions: {
                    args: ['--start-maximized'],
                },
            },
        },
    ],
}

export default config
export const outputLocation = './logs/Playwright'
export const logLevelTest = 'INFO'
