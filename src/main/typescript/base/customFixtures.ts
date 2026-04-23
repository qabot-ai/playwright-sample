import { test as base } from '@playwright/test'

import { Utility } from '../helpers/Utility'

import { LoginPage } from '../pages/LoginPage'
import { DashboardPage } from '../pages/DashboardPage'
import { VendorManagementPage } from '../pages/VendorManagementPage'

/**
 * Declare the Pages that you want to use in your test
 * */
type MyFixtures = {
    utility: Utility

    loginPage: LoginPage
    dashboardPage: DashboardPage
    vendormanagementPage: VendorManagementPage
}

/**
 * Create a custom fixture for above page that will be used in your test
 * */

export const test = base.extend<MyFixtures>({
    utility: async ({ page }, use) => {
        return await use(new Utility(page))
    },
     loginPage: async ({ page }, use) => {
        return await use(new LoginPage(page))
    },
      dashboardPage: async ({ page }, use) => {
        return await use(new DashboardPage(page))
    },
     vendormanagementPage: async ({ page }, use) =>
         {
        return await use(new VendorManagementPage(page))
    },
})
export { expect } from '@playwright/test'
