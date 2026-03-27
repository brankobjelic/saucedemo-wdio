const LoginPage = require('../po/pages/login.page');
const InventoryPage = require('../po/pages/inventory.page');

describe('SauceDemo Inventory Functional Logic', () => {
    
    // Data Provider for UC-2
    const productSets = [
        { name1: 'Sauce Labs Backpack', name2: 'Sauce Labs Bike Light' }
    ];

    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
    });

    /**
     * UC-1: Sorting Validation
     */
    it('should verify "Price (low to high)" sorting order', async () => {
        await InventoryPage.sortDropdown.selectByAttribute('value', 'lohi');

        const uiPrices = await InventoryPage.getAllPrices();
        const expectedOrder = [...uiPrices].sort((a, b) => a - b);

        await expect(uiPrices).toEqual(expectedOrder, 
            `Sorting Failed! Expected: ${expectedOrder} but got: ${uiPrices}`
        );
    });

    /**
     * UC-2: Cart State (Parametrized)
     */
    productSets.forEach(({ name1, name2 }) => {
        it(`should update cart badge when adding/removing: ${name1} and ${name2}`, async () => {
            // Add two items
            await InventoryPage.item(name1).addButton.click();
            await InventoryPage.item(name2).addButton.click();
            await expect(InventoryPage.header.cartBadge).toHaveText('2', 'Badge should show 2 items');

            // Remove one item
            await InventoryPage.item(name1).removeButton.click();
            await expect(InventoryPage.header.cartBadge).toHaveText('1', 'Badge should show 1 item after removal');
        });
    });
});