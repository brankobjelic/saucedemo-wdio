const { pages } = require('../po/pages');

describe('SauceDemo Login Visuals', () => {
    const loginPage = pages('login');

    it('should show the correct page title and login button', async () => {
        await loginPage.open();
        
        // Asserting the page title
        await expect(browser).toHaveTitle('Swag Labs');
        
        // Text-based XPath assertion for the login button
        await expect(loginPage.btnSubmit).toBePresent();
    });
});