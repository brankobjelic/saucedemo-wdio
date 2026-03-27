/**
 * The "Blueprint" for all UI components.
 * Every component must have a root element to ensure encapsulation.
 */
class BaseComponent {
    /**
     * @param {string} rootSelector - The XPath anchor for the component
     */
    constructor(rootSelector) {
        this.rootSelector = rootSelector;
    }

    /**
     * Returns the root element of the component.
     * All sub-elements should be found relative to this.
     */
    get rootEl() {
        return $(this.rootSelector);
    }
}
module.exports = BaseComponent;