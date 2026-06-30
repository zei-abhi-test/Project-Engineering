# STATES AUDIT

| Screen | Loading | Error | Empty |
|---------|---------|-------|-------|
| Dashboard | Blank dashboard | Nothing shown | N/A |
| Orders | Blank page | Nothing shown | No message |
| Products | Blank grid | Nothing shown | No message |
| Customers | Blank table | Nothing shown | No message |

---

## Loading Strategy

Orders, Products and Customers display lists/cards, so skeleton placeholders provide a better user experience than a spinner because they preserve layout and reduce visual jumps.

Dashboard contains only summary cards, so skeleton cards are also appropriate.

Skeleton animation:
- animate-pulse
- bg-gray-200
- rounded-lg
- h-24
- w-full

---

## Error Messages

Dashboard

"We couldn't load your dashboard. Check your connection and try again."

Orders

"We couldn't load your orders. Check your connection and try again."

Products

"We couldn't load your products. Please try again."

Customers

"We couldn't load your customers. Please refresh the page."

Each screen should show a Retry button.

---

## Empty States

Orders

Title:
No orders yet

Message:
Orders will appear here after customers place them.

CTA:
Refresh

Products

Title:
No products found

Message:
Start by adding your first product.

CTA:
Add Product

Customers

Title:
No customers found

Message:
Customers will appear here after registration.

CTA:
Refresh

Dashboard

No dashboard statistics available.