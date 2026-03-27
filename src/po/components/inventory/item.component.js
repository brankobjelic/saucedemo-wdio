const BaseComponent = require('../base.component');

/**
 * Encapsulates a single "Product Card" from the inventory list.
 */
class ItemComponent extends BaseComponent {
    constructor(rootSelector) {
        super(rootSelector);
    }

    /**
     * Relative XPath: Finds the price div inside this specific item card
     */
    get price() {
        return this.rootEl.$('.//div[@class="inventory_item_price"]');
    }

    get addButton() {
        return this.rootEl.$('.//button[text()="Add to cart"]');
    }

    get removeButton() {
        return this.rootEl.$('.//button[text()="Remove"]');
    }
}
module.exports = ItemComponent;