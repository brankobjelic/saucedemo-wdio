const LoginPage = require('../po/pages/login.page');
const InventoryPage = require('../po/pages/inventory.page');

describe('SauceDemo Inventory Logic', () => {
    
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
    });

    it('UC-1: should sort items by price (Low to High)', async () => {
        // Select "Price (low to high)"
        await InventoryPage.sortDropdown.selectByAttribute('value', 'lohi');

        const uiPrices = await InventoryPage.getAllPrices();
        const sortedPrices = [...uiPrices].sort((a, b) => a - b);

        // Custom error message for complex sorting logic
        await expect(uiPrices).toEqual(sortedPrices, 
            `UI prices [${uiPrices}] did not match expected sorted order [${sortedPrices}]`
        );
    });

    it('UC-2: should update cart state when adding/removing specific items', async () => {
        const item1 = 'Sauce Labs Backpack';
        const item2 = 'Sauce Labs Bike Light';

        // Add 2 items
        await InventoryPage.item(item1).addButton.click();
        await InventoryPage.item(item2).addButton.click();
        await expect(InventoryPage.header.cartBadge).toHaveText('2', 
            'Cart badge failed to show correct count after additions'
        );

        // Remove 1 item
        await InventoryPage.item(item1).removeButton.click();
        await expect(InventoryPage.header.cartBadge).toHaveText('1', 
            'Cart badge failed to decrement after removal'
        );
    });
});