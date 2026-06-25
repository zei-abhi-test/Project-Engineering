# AUDIT

## Hard Delete Statements Found

### 1. routes/users.js

```sql
DELETE FROM users WHERE id = $1
```

Data Lost:
The user record is permanently removed. User information cannot be recovered for auditing or account restoration.

---

### 2. routes/accounts.js

```sql
DELETE FROM accounts WHERE id = $1
```

Data Lost:
Account information is permanently erased, preventing historical account recovery or financial review.

---

### 3. routes/transactions.js

```sql
DELETE FROM transactions WHERE id = $1
```

Data Lost:
Financial transaction history is permanently removed, making audits and dispute resolution impossible.

---

## Tables Requiring Soft Delete

* users
* accounts
* transactions

## Exclusions

There are no session, cache, or one-time token tables in this project, so no exclusions are required.
