const LoginPage = require('./login.page');
const InventoryPage = require('./inventory.page');

/**
 * Dynamic Page Factory
 * @param {string} name - The name of the page to retrieve
 * @returns {object} - An instance of the requested Page Object
 */
function pages(name) {
    const items = {
        login: new LoginPage(),
        inventory: new InventoryPage()
    };
    return items[name.toLowerCase()];
}

module.exports = {
    LoginPage,
    InventoryPage,
    pages,
};