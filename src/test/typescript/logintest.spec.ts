
import { test } from '../../main/typescript/base/customFixtures'

import { chromium } from '@playwright/test';
test('Login as CreatedUser', async({loginPage,dashboardPage})=>
    {
    await loginPage.lauchURL();
    await loginPage.performLogin('superadmin@yopmail.com', 'Test@1234');
    await dashboardPage.dashboardHeaderVisibilty();
    }
);

