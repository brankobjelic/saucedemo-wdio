# 🧪 SauceDemo Automation Framework

This repository contains a high-level Automated Testing framework for **SauceDemo**, built using **WebdriverIO** and **Node.js**. 

## 🏗 Architecture: Component-Based POM
The project follows an advanced **Page Object Model (POM)** where pages are composed of smaller, reusable **Components**.

* **BasePage & BaseComponent**: Abstract parents that provide core functionality (like `open()` and `rootEl` handling).
* **Encapsulation**: Every component (e.g., `ItemComponent`) is initialized with a `rootSelector`. All internal elements are found using **relative XPaths** (`.//`), ensuring that logic is confined to that specific UI "chunk."
* **Domain-Driven Folders**: Components are organized into `common/` (Global UI) and `inventory/` (Page-specific UI).

## 🔍 Locator Strategy
In accordance with the project requirements, **Strict XPath** is used throughout:
* **Text-Based Selection**: Used for dynamic elements, such as finding a specific product container by its name: `//div[text()="${name}"]/ancestor::div[@class="inventory_item"]`.
* **Relative Pathing**: Components use the `rootEl` anchor to ensure locators are resilient and scoped correctly.

## 🧪 Test Coverage
The framework addresses two primary Use Cases (UC):

### UC-1: Sorting Logic
* **Logic**: The test interacts with the sorting dropdown, scrapes the resulting prices from the UI into a numeric array, and compares it against a "Source of Truth" array sorted using JavaScript's native `.sort()` method.
* **Validation**: Uses a deep-equal assertion with a custom error message for precise debugging.

### UC-2: Cart State Management
* **Logic**: Utilizes the `ItemComponent` factory to add and remove specific products by name.
* **Validation**: Verifies the shopping cart badge count in the `HeaderComponent`. It specifically checks that the badge is **not present** when the cart is empty.

## 🚀 How to Run
1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Run all tests**:
    ```bash
    npm run wdio
    ```