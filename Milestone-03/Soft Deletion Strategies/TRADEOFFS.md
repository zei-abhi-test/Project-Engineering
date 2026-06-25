# TRADEOFFS

## When Soft Delete is the Right Call

### 1. User Accounts

Users may accidentally delete their accounts or request temporary removal. Keeping soft-deleted records allows administrators to restore accounts and review account history when needed.

### 2. Financial Transactions

LedgerApp manages financial records. Soft deletion preserves transaction history for audits, dispute resolution, fraud investigations, and customer support.

---

## When Hard Delete is Appropriate

Hard deletion is appropriate for temporary data such as:

* Session tokens
* One-time passwords (OTP)
* Cache records
* Temporary log files

These records have no long-term business value and may contain sensitive information.

LedgerApp currently does not contain these tables.

---

## Compliance Scenario

Suppose a customer disputes a deleted transaction during a financial audit.

Because LedgerApp uses soft deletion, administrators can retrieve deleted records:

```sql
SELECT *
FROM transactions
WHERE deleted_at IS NOT NULL;
```

These records provide evidence of previous transactions and satisfy audit requirements.

---

## Storage Impact

Assuming LedgerApp stores approximately 5,000 transactions per day:

* Daily growth: ~5,000 rows
* Monthly growth: ~150,000 rows
* Yearly growth: ~1.8 million rows

Soft-deleted records increase table size over time.

---

## Partial Index Benefit

The partial indexes:

```sql
CREATE INDEX idx_transactions_active
ON transactions(id)
WHERE deleted_at IS NULL;
```

allow PostgreSQL to search only active records, reducing index size and improving query performance.

---

## Performance Considerations

Without partial indexes, query performance may degrade once tables contain several million records because PostgreSQL must scan both active and deleted rows.
