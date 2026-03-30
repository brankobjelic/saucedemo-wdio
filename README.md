# 🧪 SauceDemo Automation Framework

# Task description
"Inventory Logic" Flow

Focus: Data validation, sorting algorithms, and state management.

Launch URL: [https://www.saucedemo.com/](https://www.saucedemo.com/)

UC-1 Sorting Validation:

* Login with standard_user.
* Select "Price (low to high)" from the sort dropdown.
* Validation: Scrape the prices of all items on the page and programmatically verify that the array is sorted correctly in ascending order.

UC-2 Cart State Logic:

* Add two different items to the cart.
* Verify the cart badge shows "2".
* Remove one item via the "Remove" button on the Inventory page.
* Verify the cart badge updates to "1".

Technical Requirements:

* Tool: WebDriverIO.
* Browsers: Firefox, Edge (Run in Parallel).
* Pattern: Page Object Model (POM).
* Locators: XPath (Focus on text-based selection).
* Parametrization: Use Data Provider for the items being added/removed.
* Documentation: Add a README.md explaining the sorting validation logic.


---


## 🔍 Core Logic: UC-1 Sorting Validation
The most critical feature of this framework is the **mathematical verification** of product sorting. Rather than simply checking the first and last items, this framework implements a "Source of Truth" comparison:

1.  **Data Extraction**: Scrapes all raw price strings (e.g., `"$7.99"`, `"$15.99"`) currently visible in the UI.
2.  **Sanitization & Transformation**: 
    * Uses `.replace('$', '')` to strip currency symbols from the strings.
    * Uses `parseFloat()` to transform the strings into precise numeric values for calculation.
3.  **Source of Truth Generation**: Creates a deep copy of the UI array and applies JavaScript's native `.sort((a, b) => a - b)` algorithm.
4.  **Strict Mathematical Assertion**: Compares the original UI array against the mathematically sorted "Source of Truth." This ensures the application's sorting engine precisely matches expected numeric logic.

---

## 🏗 Key Architectural Patterns

### 1. Component-Based Page Object Model (POM)
The framework follows a modular approach where pages are composed of smaller, reusable **Components**.
* **Encapsulation**: Components (like `ItemComponent`) manage their own logic using **Strict XPath** relative to a `rootEl`.
* **Inheritance**: Utilizes `BasePage` and `BaseComponent` to share common utility methods and clean selectors.

### 2. Dynamic Page Factory
To improve test readability and allow for future BDD extensibility, a **Page Factory** (`src/po/pages/index.js`) is implemented.
* Tests access pages via a centralized `pages(name)` function.
* This decouples test execution from object instantiation, keeping spec files clean and focused.

### 3. Data-Driven Testing (Parametrization)
Tests are **parametrized** using Data Providers. This allows the same functional logic to run against multiple product sets without code duplication.

---

## 📊 Reporting & Execution

### Allure Reporter
The project is integrated with **Allure**, providing:
* **Visual Dashboards**: Graphical representation of test success rates and execution timelines.
* **Automatic Screenshots**: The framework captures and attaches a screenshot to the report automatically on every test failure via the `afterTest` hook.

### Spec Reporter
Configured for real-time, high-readability terminal feedback during the development process.

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: v18.x or higher.
* **Java (JRE/JDK)**: Required to generate and view the interactive Allure reports.

### Installation & Execution
```bash
# Install dependencies
npm install

# Run all tests in parallel
npm run test