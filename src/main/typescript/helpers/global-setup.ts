import { FullConfig, chromium } from '@playwright/test'
import dotenv from 'dotenv'
import rimraf from 'rimraf'

async function globalSetup(_config: FullConfig) {
    if (process.env.environmentToRun) {
        dotenv.config({
            path: `./src/main/resources/env/.env.${process.env.environmentToRun}`,
            override: false,
        })
    } else {
        // Load default .env file
        dotenv.config({
            path: `./src/main/resources/env/.env`,
            override: false,
        })
    }

    // Clean up allure results
    await new Promise(resolve => {
        rimraf(`./allure-results`, resolve)
    })

    // Perform authentication and save storage state
    console.log('👉 Starting authentication for session storage...')
    
    const browser = await chromium.launch({ headless: false })
    const context = await browser.newContext()
    const page = await context.newPage()

    try {
        const baseUrl = process.env.BASE_URL || 'https://dev-freight.wendai.ai/login'
        const username = process.env.SuperAdminEmail || process.env.USERNAME || 'superadmin@yopmail.com'
        const password = process.env.SuperAdminPassword || process.env.PASSWORD || 'Test@12345'

        console.log('👉 Opening application at:', baseUrl)
        await page.goto(baseUrl, { waitUntil: 'networkidle' })

        console.log('👉 Entering credentials:', username)
        await page.locator("input[type='email']").fill(username)
        await page.locator("input[type='password']").fill(password)

        console.log('👉 Clicking LOGIN button')
        await page.locator("button:has-text('LOGIN')").click()

        console.log('👉 Waiting for dashboard/invoices page load after login')
        // Wait for either Dashboard redirect or stay on page without login form
        try {
            await Promise.race([
                page.waitForURL('**/dashboard', { timeout: 10000 }),
                page.waitForURL('**/invoices', { timeout: 10000 }),
                page.locator("//h1[text()='Dashboard']").waitFor({ timeout: 10000 }),
            ])
        } catch {
            // Check if we successfully logged in by checking if the email field is gone
            const emailFieldExists = await page.locator("input[type='email']").count() > 0
            if (emailFieldExists) {
                throw new Error('Login failed - still on login page')
            }
        }

        console.log('👉 Saving storage state')
        await context.storageState({ path: 'storageState.json' })
        console.log('✅ storageState.json created successfully')

    } catch (error) {
        console.error('❌ Error during authentication:', error)
        throw error
    } finally {
        await browser.close()
    }
}

export default globalSetup
