import type { PlaywrightTestConfig } from '@playwright/test'
import dotenv from 'dotenv'

// Load environment variables from .env.dev by default
dotenv.config({
    path: `./src/main/resources/env/.env.${process.env.environmentToRun || 'dev'}`,
    override: false,
})

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
    globalSetup: require.resolve('./src/main/typescript/helpers/global-setup.ts'),

    /* Maximum time one test can run for. */
    timeout: 120000,
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
        actionTimeout: 30000,
        screenshot: 'on',
        trace: 'on', // Capture full trace with all network info
        video: 'on', // Record video for all tests
        acceptDownloads: true,
        permissions: ['clipboard-read', 'clipboard-write'],
        storageState: process.env.CI ? 'storageState.json' : 'storageState.json', // Created by globalSetup
            },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'mroads',
            testDir: './src/test/typescript',
            //testMatch: ['addadmin.spec.ts','yopmailandchangepwd.spec.ts'],
            testMatch: ['vendormanagement.spec.ts','addadmin.spec.ts','yopmailandchangepwd.spec.ts'], // Include all tests
            use: {
                channel: 'chromium',
                acceptDownloads: true,
                headless: true,
                viewport: null,
        
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
