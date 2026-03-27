const BaseComponent = require('../base.component');

class HeaderComponent extends BaseComponent {
    constructor() {
        // Global header container
        super('//div[@id="header_container"]');
    }

    /**
     * XPath: Finds the badge count inside the shopping cart link
     */
    get cartBadge() { 
        return this.rootEl.$('.//span[@class="shopping_cart_badge"]'); 
    }

    get title() { 
        return this.rootEl.$('.//span[@class="title"]'); 
    }
}
module.exports = HeaderComponent;