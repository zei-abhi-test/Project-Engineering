# ShopFlat Folder Restructure

# Current State

The application currently uses a flat folder structure where every file is placed directly inside `src/`.

```
src/
├── apiClient.js
├── App.jsx
├── Button.jsx
├── CartItem.jsx
├── cartService.js
├── CartSummary.jsx
├── CheckoutModal.jsx
├── Dashboard.jsx
├── EmptyState.jsx
├── ErrorMessage.jsx
├── formatCurrency.js
├── index.css
├── LoginForm.jsx
├── loginService.js
├── LogoutButton.jsx
├── main.jsx
├── Modal.jsx
├── Navbar.jsx
├── OrderCard.jsx
├── OrdersList.jsx
├── ordersService.js
├── ProductCard.jsx
├── ProductList.jsx
├── productsService.js
├── Spinner.jsx
├── truncateText.js
├── useCart.js
├── useDebounce.js
├── useLogin.js
└── useProducts.js
```

## Time-to-find Estimate

A new developer would likely need **15–20 minutes** to locate the cart checkout logic because all files are mixed together without feature separation.

# File Mapping

| Current File | New Location |
|--------------|--------------|
| LoginForm.jsx | src/features/auth/LoginForm.jsx |
| loginService.js | src/features/auth/loginService.js |
| useLogin.js | src/features/auth/useLogin.js |
| LogoutButton.jsx | src/features/auth/LogoutButton.jsx |
| CartItem.jsx | src/features/cart/CartItem.jsx |
| CartSummary.jsx | src/features/cart/CartSummary.jsx |
| CheckoutModal.jsx | src/features/cart/CheckoutModal.jsx |
| cartService.js | src/features/cart/cartService.js |
| useCart.js | src/features/cart/useCart.js |
| ProductCard.jsx | src/features/products/ProductCard.jsx |
| ProductList.jsx | src/features/products/ProductList.jsx |
| productsService.js | src/features/products/productsService.js |
| useProducts.js | src/features/products/useProducts.js |
| OrderCard.jsx | src/features/orders/OrderCard.jsx |
| OrdersList.jsx | src/features/orders/OrdersList.jsx |
| ordersService.js | src/features/orders/ordersService.js |
| Button.jsx | src/components/Button.jsx |
| Modal.jsx | src/components/Modal.jsx |
| Spinner.jsx | src/components/Spinner.jsx |
| EmptyState.jsx | src/components/EmptyState.jsx |
| ErrorMessage.jsx | src/components/ErrorMessage.jsx |
| Navbar.jsx | src/components/Navbar.jsx |
| Dashboard.jsx | src/components/Dashboard.jsx |
| formatCurrency.js | src/utils/formatCurrency.js |
| truncateText.js | src/utils/truncateText.js |
| useDebounce.js | src/hooks/useDebounce.js |
| apiClient.js | src/services/apiClient.js |


# Target Folder Structure

```
src/
│
├── features/
│   ├── auth/
│   ├── cart/
│   ├── products/
│   └── orders/
│
├── components/
│
├── hooks/
│
├── utils/
│
├── services/
│
├── App.jsx
├── main.jsx
└── index.css
```