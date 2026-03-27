/**
 * Main Page Object containing methods shared across all pages.
 */
class BasePage {
    /**
     * Opens a sub-page of the base URL (from wdio.conf.js)
     * @param {string} path - e.g., 'inventory.html'
     */
    async open(path) {
        return await browser.url(`/${path}`);
    }
}
module.exports = BasePage;