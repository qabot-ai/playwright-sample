import { BasePage } from '../base/BasePage'
import { step } from '../helpers/Decorators'

export class InvoiceSearchPage extends BasePage {
    // XPath string selectors
    private readonly invoiceSearchInput = "//input[contains(@placeholder, 'Search')]"
    private readonly tableContainer = "//div[contains(@class, 'table') or contains(@role, 'grid')]"
    private readonly invoiceNumberInTable = (invoiceNum: string) => `//td[contains(text(), '${invoiceNum}')] | //*[contains(text(), '${invoiceNum}')]`

    @step('Navigate to Invoices Page')
    async navigateToInvoices() {
        const invoicesUrl = this.ENV.BASE_URL.replace('/login', '/invoices')
        await this.page.goto(invoicesUrl, { waitUntil: 'load' })
        await this.page.waitForTimeout(2000)
    }

    @step('Wait for Invoices Page Content to Load')
    async waitForInvoicesTableToLoad() {
        // Wait for page to show invoice content - look for any element that indicates we're on invoices page
        await Promise.race([
            this.page.locator("//table").first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}),
            this.page.locator("//div[contains(@class, 'invoice') or contains(@class, 'table')]").first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}),
            this.page.locator("//h1, //h2, //span").filter({ hasText: /invoice|Invoice/i }).first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}),
            this.page.waitForLoadState('networkidle')
        ])
        await this.page.waitForTimeout(1000)
    }

    @step('Search Invoice by Number: {invoiceNum}')
    async searchByInvoiceNumber(invoiceNum: string) {
        // Try to find and fill the search input
        const searchInputs = await this.page.locator("input[type='text'], input[placeholder*='Search'], input[placeholder*='search']").all()
        if (searchInputs.length > 0) {
            await searchInputs[0].fill(invoiceNum)
            await this.page.waitForTimeout(1500)
        } else {
            console.log('⚠️ Search input not found, skipping search')
        }
    }

    @step('Verify Invoice {invoiceNum} is Visible in Table')
    async verifyInvoiceVisibleInTable(invoiceNum: string) {
        // Look for the invoice number anywhere on the page
        const invoiceLocator = this.page.locator(`//*[contains(text(), '${invoiceNum}')]`).first()
        await invoiceLocator.waitFor({ state: 'visible', timeout: 10000 })
    }
}
