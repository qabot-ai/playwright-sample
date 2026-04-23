import { clearScreenDown } from 'readline';
import { BasePage } from '../base/BasePage'
import { step } from '../helpers/Decorators'
export class LoginPage extends BasePage 
{
private readonly superadminemail="//input[@id='email']";
private readonly superadminpassword="//input[@id='password']";
private readonly login="//button[text()='LOGIN']";
@step('lauchURL')
async lauchURL()
  {
        await this.page.goto(this.ENV.BASE_URL);
  }
@step('performLogin')
 async performLogin(superadminemail: string, superadminpassword: string )
  {
        await this.utility.typeText({ selector: this.superadminemail, text:superadminemail  })
        await this.utility.typeText({ selector: this.superadminpassword, text:superadminpassword })
        await this.utility.click({ selector: this.login })
          
  
  }
}