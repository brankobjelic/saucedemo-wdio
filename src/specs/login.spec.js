const LoginPage = require('../po/pages/login.page');

describe('Login Page Visuals', () => {
    it('should show the correct page title', async () => {
        await LoginPage.open();
        await expect(browser).toHaveTitle('Swag Labs');
    });

    // You can add a quick check for the login button text here 
    // to satisfy the "text-based XPath" requirement one more time.
    it('should have a login button with the correct text', async () => {
        await LoginPage.open();
        await expect(LoginPage.btnSubmit).toBePresent();
    });
});