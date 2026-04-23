import { expect } from '@playwright/test';
import { BasePage } from '../base/BasePage'
import { step } from '../helpers/Decorators'
export class DashboardPage extends BasePage 
{
private readonly Dashboardheader="//h1[text()='Dashboard']";
@step('dashboardHeaderVisibilty')
 async dashboardHeaderVisibilty()
 {
      await this.utility.checkIfElementExists({selector: this.Dashboardheader}) 
      await expect(this.page.locator(this.Dashboardheader)).toBeVisible();        
}
}