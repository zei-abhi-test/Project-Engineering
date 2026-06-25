# DEBUG REPORT

# Bug 1 – Orders with Missing Customer

## Symptom

Some orders appeared with a NULL customer name when listing all orders.

### Reproduction Query

```sql
SELECT o.id,
       o.customer_id,
       c.name
FROM orders o
LEFT JOIN customers c
ON o.customer_id = c.id
WHERE c.id IS NULL;
```

### Data Flow Trace

API → `routes/orders.js` → `INSERT INTO orders` → `orders.customer_id` → `LEFT JOIN customers`

### Root Cause

The `orders.customer_id` column had **no FOREIGN KEY constraint**, allowing orders to reference customers that do not exist.

### Fix Applied

```sql
ALTER TABLE orders
ADD CONSTRAINT fk_orders_customer
FOREIGN KEY (customer_id)
REFERENCES customers(id);
```

### Validation

Re-run the reproduction query:

```sql
SELECT o.id,
       o.customer_id,
       c.name
FROM orders o
LEFT JOIN customers c
ON o.customer_id = c.id
WHERE c.id IS NULL;
```

Attempt invalid insert:

```sql
INSERT INTO orders(customer_id,total)
VALUES(9999,100);
```

Expected:

```
ERROR: insert or update violates foreign key constraint
```

---

# Bug 2 – Negative Inventory

## Symptom

Some products had negative inventory values.

### Reproduction Query

```sql
SELECT *
FROM products
WHERE inventory_count < 0;
```

### Data Flow Trace

API → `routes/order_items.js` → inventory update → `products.inventory_count`

### Root Cause

The `inventory_count` column had **no CHECK constraint**.

### Fix Applied

```sql
ALTER TABLE products
ADD CONSTRAINT chk_inventory
CHECK (inventory_count >= 0);
```

### Validation

Attempt:

```sql
UPDATE products
SET inventory_count=-5
WHERE id=1;
```

Expected:

```
ERROR: new row violates check constraint
```

---

# Bug 3 – Duplicate Payments

## Symptom

Some orders had two payment records.

### Reproduction Query

```sql
SELECT order_id,
       COUNT(*)
FROM payments
GROUP BY order_id
HAVING COUNT(*) > 1;
```

### Data Flow Trace

API → `routes/payments.js` → `INSERT INTO payments` → `payments.order_id`

### Root Cause

The `payments.order_id` column had **no UNIQUE constraint**.

### Fix Applied

```sql
ALTER TABLE payments
ADD CONSTRAINT unique_order_payment
UNIQUE(order_id);
```

### Validation

Attempt:

```sql
INSERT INTO payments(order_id,amount,status)
VALUES(1,100,'pending');
```

Expected:

```
ERROR: duplicate key value violates unique constraint
```
