import { test, expect } from '../../main/typescript/base/customFixtures'

test(
    'SCRUM-8: Test Case: Verify Search by Invoice Num',
    { tag: ['@Smoke', '@Regression'] },
    async ({ invoiceSearchPage }) => {
        // Step 1-4: Navigate to Invoices page (global setup already handles login)
        await invoiceSearchPage.navigateToInvoices()

        // Step 5: Wait for the invoices data table to appear
        await invoiceSearchPage.waitForInvoicesTableToLoad()

        // Step 6-7: Search by Invoice number "BT-25-0060"
        await invoiceSearchPage.searchByInvoiceNumber('BT-25-0060')

        // Step 8 - Expected Result: Searched invoice should be visible in below table
        await invoiceSearchPage.verifyInvoiceVisibleInTable('BT-25-0060')

        console.log('✅ Invoice BT-25-0060 is successfully found and visible in the table')
    }
)
