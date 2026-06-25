# DEBUG REPORT

# Bug 1 – Orders with Missing Customer

## Symptom

Some orders appear with a NULL customer name.

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

---

# Bug 2 – Negative Product Inventory

## Symptom

Some products have inventory below zero.

### Reproduction Query

```sql
SELECT *
FROM products
WHERE inventory_count < 0;
```

---

# Bug 3 – Duplicate Payments

## Symptom

Some orders contain multiple payment records.

### Reproduction Query

```sql
SELECT order_id,
       COUNT(*)
FROM payments
GROUP BY order_id
HAVING COUNT(*) > 1;
```
