const BasePage = require('./base.page');
const HeaderComponent = require('../components/common/header.component');
const ItemComponent = require('../components/inventory/item.component');

class InventoryPage extends BasePage {
    constructor() {
        super();
        this.header = new HeaderComponent();
    }

    get sortDropdown() { 
        return $('//select[@class="product_sort_container"]'); 
    }

    /**
     * Factory method to generate a component for a specific item using its name
     * @param {string} name - Product Name
     */
    item(name) {
        const xpath = `//div[text()="${name}"]/ancestor::div[@class="inventory_item"]`;
        return new ItemComponent(xpath);
    }

    /**
     * UC-1 Logic: Collects and cleans price data from the UI
     * @returns {Promise<number[]>}
     */
    async getAllPrices() {
        // We still need to find all item containers first
        const itemContainers = await $$('//div[@class="inventory_item"]');
        const prices = [];

        for (const container of itemContainers) {
            // We can actually use the component logic here!
            const priceText = await container.$('.//div[@class="inventory_item_price"]').getText();
            prices.push(parseFloat(priceText.replace('$', '')));
        }
        return prices;
    }
}
module.exports = InventoryPage;