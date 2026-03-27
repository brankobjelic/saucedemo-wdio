const BasePage = require('./base.page');

class LoginPage extends BasePage {
    // Strict XPath locators
    get inputUsername() { return $('//input[@id="user-name"]'); }
    get inputPassword() { return $('//input[@id="password"]'); }
    
    // Text-based XPath selection
    get btnSubmit() { return $('//input[@value="Login"]'); }

    async open() {
        return await super.open('');
    }

    /**
     * @param {string} username 
     * @param {string} password 
     */
    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }
}
module.exports = new LoginPage();