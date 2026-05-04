import { test, expect } from '../../main/typescript/base/customFixtures'

test(
    'Test Case: Verify Export to Excel Button on Invoice Details',
    { tag: ['@Smoke', '@Regression'] },
    async ({ invoiceDetailsPage, page }) => {
        // Steps 1-5: Navigate to invoices page (global setup already handles login)
        await invoiceDetailsPage.navigateToInvoices()

        // Step 8: Click on first invoice record
        await invoiceDetailsPage.clickViewOnFirstInvoice()

        // Step 9: Verify Invoice Details Section is visible
        await invoiceDetailsPage.verifyInvoiceDetailsSectionVisible()

        // Step 9 (Expected Result): Verify Export to Excel button is visible
        const exportBtn = page.getByRole('button', { name: 'Export to Excel' })
        await expect(exportBtn).toBeVisible()

        console.log('✅ Export to Excel button is visible on the Invoice Details page')
    }
)
