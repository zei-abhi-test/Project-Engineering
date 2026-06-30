# API Service Layer Audit Report

## Initial Findings

### API Calls

- ProductsPage: Multiple fetch() calls for products, categories, and category filtering.
- ProductDetailPage: One fetch() call for product details.
- CartPage: Multiple fetch() calls for cart retrieval, add, and delete.
- ProfilePage: Multiple fetch() calls for profile retrieval and update.

### Hardcoded URLs

The application directly referenced:

https://fakestoreapi.com

in multiple files, meaning any backend URL change would require editing several components.

### Authentication

Authentication tokens were manually retrieved using:

```javascript
localStorage.getItem("auth_token")