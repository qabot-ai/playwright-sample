import { BasePage } from '../base/BasePage'
import { step } from '../helpers/Decorators'

export class InvoiceDetailsPage extends BasePage {
    // XPath string selectors
    private readonly invoiceDetailsHeading = "//h3[text()='Invoice Details']"

    // Arrow-function locators
    private readonly viewFirstInvoiceBtn = () => this.page.locator("//a[contains(@href,'/document-preview/')]").first()
    private readonly exportToExcelBtn = () => this.page.getByRole('button', { name: 'Export to Excel' })

    @step('Navigate to Invoices Page')
    async navigateToInvoices() {
        const invoicesUrl = this.ENV.BASE_URL.replace('/login', '/invoices')
        await this.page.goto(invoicesUrl)
        await this.page.waitForLoadState('networkidle')
    }

    @step('Click View on First Invoice')
    async clickViewOnFirstInvoice() {
        await this.viewFirstInvoiceBtn().waitFor({ state: 'visible', timeout: 15000 })
        await this.viewFirstInvoiceBtn().click()
        await this.page.waitForLoadState('networkidle')
    }

    @step('Verify Invoice Details Section is Visible')
    async verifyInvoiceDetailsSectionVisible() {
        await this.utility.waitForLocator({ selector: this.invoiceDetailsHeading })
    }

    @step('Click Export to Excel Button and Capture Download')
    async clickExportToExcelAndGetDownload() {
        await this.exportToExcelBtn().waitFor({ state: 'visible', timeout: 10000 })
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.exportToExcelBtn().click()
        ])
        return download
    }
}
