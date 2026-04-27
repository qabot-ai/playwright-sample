import { test as base } from '@playwright/test'

import { Utility } from '../helpers/Utility'

import { LoginPage } from '../pages/LoginPage'
import { DashboardPage } from '../pages/DashboardPage'
import { VendorManagementPage } from '../pages/VendorManagementPage'
import { AddAdminPage } from '../pages/AddAdminPage'
import ENV from '../../resources/env/env'

/**
 * Declare the Pages that you want to use in your test
 * */
type MyFixtures = {
    utility: Utility

    loginPage: LoginPage
    dashboardPage: DashboardPage
    vendormanagementPage: VendorManagementPage
    addadminPage: AddAdminPage
    ENV: typeof ENV
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
    addadminPage: async ({ page }, use) => 
        {
        return await use(new AddAdminPage(page))
     },

    ENV: async ({}, use) => {
        return await use(ENV)
    }
})
export { expect } from '@playwright/test'
