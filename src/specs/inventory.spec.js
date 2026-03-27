const { pages } = require('../po/pages');

describe('SauceDemo Inventory Functional Logic', () => {
    const loginPage = pages('login');
    const inventoryPage = pages('inventory');

    /**
     * Data Provider for UC-2: Parametrization
     * Decouples the test data (Product Names) from the execution logic.
     */
    const productSets = [
        { name1: 'Sauce Labs Backpack', name2: 'Sauce Labs Bike Light' }
    ];

    beforeEach(async () => {
        // Shared setup for all inventory tests
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    /**
     * UC-1: Verify that selecting "Price (low to high)" 
     * sorts the items correctly in the UI.
     */
    it('should sort products by price from low to high', async () => {
        // 1. Interact with the sorting dropdown
        await inventoryPage.sortDropdown.selectByAttribute('value', 'lohi');

        // 2. Get the prices as they appear on the UI
        const uiPrices = await inventoryPage.getAllPrices();
        
        // 3. Create a mathematically sorted version as our "Source of Truth"
        const expectedPrices = [...uiPrices].sort((a, b) => a - b);

        // 4. Assertion with custom error message for better debugging
        await expect(uiPrices).toEqual(expectedPrices, 
            `UI Sorting failed! Expected order: ${expectedPrices}, but got: ${uiPrices}`
        );
    });

    /**
     * UC-2: Verify the shopping cart badge updates 
     * based on adding and removing specific items.
     */
    productSets.forEach(({ name1, name2 }) => {
        it(`should update cart badge when adding/removing: ${name1} and ${name2}`, async () => {
            // Add two items using the Component-based POM
            await inventoryPage.item(name1).addButton.click();
            await inventoryPage.item(name2).addButton.click();
            
            // Verify badge increment
            await expect(inventoryPage.header.cartBadge).toHaveText('2', 
                'Cart badge did not reach 2 after adding items'
            );

            // Remove one item
            await inventoryPage.item(name1).removeButton.click();
            
            // Verify badge decrement
            await expect(inventoryPage.header.cartBadge).toHaveText('1', 
                'Cart badge did not decrement to 1 after removing an item'
            );
        });
    });
});