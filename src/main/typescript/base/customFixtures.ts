import { test as base } from '@playwright/test'

import { Utility } from '../helpers/Utility'

import { LoginPage } from '../pages/LoginPage'
import { DashboardPage } from '../pages/DashboardPage'
import { VendorManagementPage } from '../pages/VendorManagementPage'
import { AddAdminPage } from '../pages/AddAdminPage'
import { YopmailandchangepwdPage } from '../pages/YopmailandchangepwdPage'
import { InvoiceDetailsPage } from '../pages/InvoiceDetailsPage'
import { InvoiceSearchPage } from '../pages/InvoiceSearchPage'
import { UserManagementPage } from '../pages/UserManagementPage'
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
    yopmailandchangepwdPage: YopmailandchangepwdPage
    invoiceDetailsPage: InvoiceDetailsPage
    invoiceSearchPage: InvoiceSearchPage
    userManagementPage: UserManagementPage
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
    yopmailandchangepwdPage: async ({ page }, use) => 
        {
        return await use(new YopmailandchangepwdPage(page))
     },
    invoiceDetailsPage: async ({ page }, use) => {
        return await use(new InvoiceDetailsPage(page))
    },
    invoiceSearchPage: async ({ page }, use) => {
        return await use(new InvoiceSearchPage(page))
    },
     userManagementPage: async ({ page }, use) => {
        return await use(new UserManagementPage(page))
    },
    ENV: async ({}, use) => {
        return await use(ENV)
    }
})
export { expect } from '@playwright/test'
