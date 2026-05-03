import { test, expect } from '../../main/typescript/base/customFixtures'

test(
    'SCRUM-7: Verify Export to Excel Button on Invoice Details',
    { tag: ['@Smoke', '@Regression'] },
    async ({ invoiceDetailsPage }) => {
        // Navigate to Invoices page
        await invoiceDetailsPage.navigateToInvoices()

        // Click View on the first invoice to open Invoice Details
        await invoiceDetailsPage.clickViewOnFirstInvoice()

        // Verify Invoice Details section is visible
        await invoiceDetailsPage.verifyInvoiceDetailsSectionVisible()

        // Click Export to Excel button and capture the download event
        const download = await invoiceDetailsPage.clickExportToExcelAndGetDownload()

        // Verify the downloaded file name matches expected pattern
        expect(download.suggestedFilename()).toMatch(/invoice.*\.(csv|xlsx)$/i)
    }
)
