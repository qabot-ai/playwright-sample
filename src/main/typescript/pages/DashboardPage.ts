import { expect } from '@playwright/test';
import { BasePage } from '../base/BasePage'
import { step } from '../helpers/Decorators'
export class DashboardPage extends BasePage 
{
private readonly Dashoardheader="//h1[text()='Dashboard']";
@step('dashboardHeaderVisibilty')
 async dashboardHeaderVisibilty()
 {
      await this.utility.checkIfElementExists({selector: this.Dashoardheader}) 
      await expect(this.page.locator(this.Dashoardheader)).toBeVisible();        
}
}