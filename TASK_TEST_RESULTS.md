# 🧪 Task Test Results

Manual test results for the **TechStore E-commerce Frontend** (Task 4).

- **Tested on:** Google Chrome (DevTools device mode)
- **Environments:** Local (`npm run dev`) and Vercel Preview
- **Date:** November 2026

---

## Results Summary

| #   | Test                                                      | Result  |
| --- | --------------------------------------------------------- | ------- |
| 1   | Open all routes from the Navbar and internal links        | ✅ Pass |
| 2   | Refresh a product details page and confirm it still shows | ✅ Pass |
| 3   | Search for an existing and a non-existing product         | ✅ Pass |
| 4   | Apply more than one filter, then clear filters            | ✅ Pass |
| 5   | Add a product to the cart, then refresh the page          | ✅ Pass |
| 6   | Try to add a quantity larger than the stock               | ✅ Pass |
| 7   | Change quantity and remove a product from the cart        | ✅ Pass |
| 8   | Complete Checkout with valid and incomplete data          | ✅ Pass |
| 9   | Log in as customer and try to open `/admin`               | ✅ Pass |
| 10  | Log in as admin and open the dashboard                    | ✅ Pass |
| 11  | Test the UI at 1440px, 768px and 390px                    | ✅ Pass |
| 12  | Navigate with the keyboard and check Focus                | ✅ Pass |
| 13  | Run `npm run build` and confirm success                   | ✅ Pass |

**Total: 13 / 13 passed ✅**

---

## Test Details

### 1. Open all routes from the Navbar and internal links

- **Steps:** Clicked Home, Products, Cart, Login/Profile, Dashboard; clicked category cards, product cards, "View all", "Back to Products", footer links.
- **Expected:** Each link opens the correct page without a full page reload.
- **Result:** ✅ All routes open correctly. Active link is highlighted in the Navbar. Unknown routes (e.g. `/blabla`) show the 404 page.

### 2. Refresh a product details page

- **Steps:** Opened `/products/5`, pressed F5 (locally and on Vercel).
- **Expected:** The same product is still displayed.
- **Result:** ✅ Page reloads with the same product. `vercel.json` rewrites make all routes work after refresh on the Preview. `/products/999` shows "Product not found".

### 3. Search for an existing and non-existing product

- **Steps:** Searched `LAPTOP` (uppercase) and `xyz`.
- **Expected:** Case-insensitive results for existing names; a clear empty state for no matches.
- **Result:** ✅ `LAPTOP` returns 3 products (search is by product name). `xyz` shows "No products found" with a Clear Filters button.

### 4. Apply multiple filters, then clear

- **Steps:** Category = Audio + Max Price = 50 + Availability = In Stock, then clicked "Clear Filters".
- **Expected:** Results match all filters; clearing restores all products.
- **Result:** ✅ Filters combine correctly and the results count updates. Clear Filters resets search, category, price, stock and sort.

### 5. Add to cart, then refresh

- **Steps:** Added 2 products, pressed F5.
- **Expected:** Cart items and Navbar count remain.
- **Result:** ✅ Cart is restored from Local Storage (`techstore-cart`).

### 6. Add a quantity larger than the stock

- **Steps:** Opened "Gaming Laptop X17" (stock = 2), selected 2 and added, then tried to add again.
- **Expected:** The app prevents exceeding the stock.
- **Result:** ✅ The "+" button is disabled at the stock limit, and adding again shows an error toast. Out-of-stock products have a disabled button.

### 7. Change quantity and remove a product

- **Steps:** Used + / − in the cart, then clicked 🗑️.
- **Expected:** Totals update instantly; removal asks for confirmation.
- **Result:** ✅ Subtotals and total are recalculated from cart data. Remove opens a confirm dialog (closable with Esc / Cancel / outside click). Removing all items shows the empty cart state.

### 8. Checkout with valid and incomplete data

- **Steps:** Submitted an empty form, then an invalid phone (`12345`), then valid data.
- **Expected:** Errors for invalid data; success for valid data.
- **Result:** ✅ Field errors appear under each input with an error toast. Valid data shows a loading button, then a success screen with an order number, and the cart is cleared.

### 9. Customer tries to open `/admin`

- **Steps:** Logged in as `customer@techstore.test`, opened `/admin`.
- **Expected:** Access is denied.
- **Result:** ✅ "Access Denied" (Unauthorized state) with a link back to Home. Logged-out users opening `/profile` are redirected to Login and returned to `/profile` after logging in.

### 10. Admin opens the dashboard

- **Steps:** Logged in as `admin@techstore.test`.
- **Expected:** Redirect to the dashboard with admin features.
- **Result:** ✅ Stats cards, recent orders, low stock list. Products: search, filter, add, edit, disable (with confirmation). Categories: add / delete (only empty ones). Orders: filter and change status locally.

### 11. Responsive design

- **Steps:** Tested Home, Products, Details, Cart, Checkout, Login, Profile and Admin on 1440px (Responsive), 768px (iPad Mini) and 390px (iPhone 12 Pro).
- **Expected:** No horizontal scrolling; layout adapts to each size.
- **Result:** ✅ Mobile menu (☰), collapsible product filters, stacked cards, admin tables turn into cards, admin sidebar becomes horizontal tabs. No unintended horizontal scrolling. (See `screenshots/`)

### 12. Keyboard navigation and Focus

- **Steps:** Navigated with Tab / Shift+Tab / Enter / Esc.
- **Expected:** Visible focus and keyboard-usable controls.
- **Result:** ✅ "Skip to main content" link appears on first Tab. Visible orange focus outline on all links, buttons and inputs. Modals close with Esc.

### 13. `npm run build`

- **Steps:** Ran `npm run lint` and `npm run build`.
- **Expected:** No errors.
- **Result:** ✅ Lint passes with no warnings, build completes successfully. (See `screenshots/build-success.png`)

---

## Extra Checks

| Check                                                   | Result  |
| ------------------------------------------------------- | ------- |
| Loading skeleton on Products and Product Details        | ✅ Pass |
| Error state with retry (`/products?simulateError=true`) | ✅ Pass |
| No red errors in the browser Console during normal use  | ✅ Pass |
| No real secrets or passwords in the repository          | ✅ Pass |
| `node_modules` not committed (in `.gitignore`)          | ✅ Pass |
