# Monitor & Debug Log

**Engineer:** Abhishek B K

**Date:** 08-07-2026

---

# 1. Before

The deployed endpoint returned:

```json
[]
```

Render logs contained no request logs or error messages, making it difficult to diagnose the issue.

---

# 2. Telemetry Added

Added:

- Morgan middleware
- console.error() inside catch blocks
- NODE_ENV=production on Render

Morgan configuration:

```javascript
const morganFormat =
  process.env.NODE_ENV === "production"
    ? "combined"
    : "dev";

app.use(morgan(morganFormat));
```

---

# 3. Root Cause

Morgan logs showed:

```text
GET /api/products 200 2 - XX ms
```

The response size was only **2 bytes**, indicating the API returned an empty array.

The issue was located in:

```
src/controllers/productController.js
```

The controller always executed:

```javascript
Product.find({
  category: req.query.category
});
```

When `category` was not supplied, MongoDB searched for:

```javascript
{
  category: undefined
}
```

and returned no documents.

---

# 4. The Fix

Created a dynamic filter:

```javascript
const filter = {};

if (req.query.category) {
  filter.category = req.query.category;
}

const products = await Product.find(filter);
```

Also added `console.error()` inside the catch block.

---

# 5. Verification

After redeployment:

Morgan log:

```text
GET /api/products 200 684 - XX ms
```

The response now contains product data instead of an empty array.

The larger response size confirms the issue has been resolved.