# Changes.md

# Role Gap Audit

Before implementing Role-Based Access Control (RBAC), a regular authenticated user was able to perform several sensitive actions that should have been restricted.

| HTTP Method | Endpoint                  | Expected                   | Actual Before Fix                             |
| ----------- | ------------------------- | -------------------------- | --------------------------------------------- |
| GET         | /api/expenses             | Manager/Admin only         | Accessible by any authenticated user          |
| PUT         | /api/expenses/:id/approve | Manager/Admin only         | Accessible by any authenticated user          |
| PUT         | /api/expenses/:id/reject  | Manager/Admin only         | Accessible by any authenticated user          |
| DELETE      | /api/expenses/:id         | Admin only                 | Accessible by any authenticated user          |
| GET         | /api/users                | Admin only                 | Accessible by any authenticated user          |
| PUT         | /api/users/:id/role       | Admin only                 | Accessible by any authenticated user          |
| PUT         | /api/expenses/:id         | Owner (or privileged user) | Any authenticated user could edit any expense |

---

# Root Cause Analysis

## 1. Missing Role in JWT

The authentication controller generated JWTs containing only the user's ID and email. Since the role was not included in the token payload, middleware could not perform role-based authorization directly from the JWT.

**Risk:** Every authenticated user was treated the same regardless of their actual role.

---

## 2. Missing Role Middleware

The application had authentication middleware (`protect`) but no authorization middleware to restrict routes based on user roles.

**Risk:** Any logged-in user could access manager-only and admin-only endpoints.

---

## 3. Unprotected Sensitive Routes

The following routes were protected only by authentication:

* GET /api/expenses
* PUT /api/expenses/:id/approve
* PUT /api/expenses/:id/reject
* DELETE /api/expenses/:id
* GET /api/users
* PUT /api/users/:id/role

Since these routes lacked role checks, all authenticated users could perform privileged actions.

---

## 4. Missing Ownership Validation

The expense update controller updated expenses directly without checking ownership.

**Risk:** User A could modify User B's submitted expense simply by knowing its ID.

---

# Access Model

| Action            | Endpoint                      | Before Fix              | After Fix                |
| ----------------- | ----------------------------- | ----------------------- | ------------------------ |
| Submit Expense    | POST /api/expenses            | All authenticated users | User, Manager, Admin     |
| View Own Expenses | GET /api/expenses/mine        | All authenticated users | User, Manager, Admin     |
| View All Expenses | GET /api/expenses             | All authenticated users | Manager, Admin           |
| Approve Expense   | PUT /api/expenses/:id/approve | All authenticated users | Manager, Admin           |
| Reject Expense    | PUT /api/expenses/:id/reject  | All authenticated users | Manager, Admin           |
| Delete Expense    | DELETE /api/expenses/:id      | All authenticated users | Admin only               |
| View Users        | GET /api/users                | All authenticated users | Admin only               |
| Change User Role  | PUT /api/users/:id/role       | All authenticated users | Admin only               |
| View Own Profile  | GET /api/users/me             | All authenticated users | User, Manager, Admin     |
| Update Expense    | PUT /api/expenses/:id         | Any authenticated user  | Owner or privileged user |

---

# What I Fixed

## 1. JWT Payload

### Before

```javascript
jwt.sign(
  {
    userId: user._id,
    email: user.email
  },
  process.env.JWT_SECRET
);
```

### After

```javascript
jwt.sign(
  {
    userId: user._id,
    email: user.email,
    role: user.role
  },
  process.env.JWT_SECRET
);
```

---

## 2. Created Role Middleware

Added a new middleware (`roleMiddleware.js`) that verifies whether the authenticated user's role is included in the list of allowed roles before allowing access to protected routes.

---

## 3. Applied Role Middleware

Updated the following routes:

* GET /api/expenses → Manager/Admin
* PUT /api/expenses/:id/approve → Manager/Admin
* PUT /api/expenses/:id/reject → Manager/Admin
* DELETE /api/expenses/:id → Admin
* GET /api/users → Admin
* PUT /api/users/:id/role → Admin

---

## 4. Added Ownership Check

Updated the expense update controller to verify that:

* the requester owns the expense, or
* the requester has a privileged role (Manager/Admin).

Unauthorized users now receive:

```
403 Forbidden
```

instead of modifying another user's expense.

---

# Verification Results

| Scenario                                     | Role Used | Expected | Actual | Screenshot                         |
| -------------------------------------------- | --------- | -------- | ------ | ---------------------------------- |
| User attempts to approve expense             | User      | 403      | 403    | screenshots/01-user-approve.png    |
| User attempts to delete expense              | User      | 403      | 403    | screenshots/02-user-delete.png     |
| User attempts to change user role            | User      | 403      | 403    | screenshots/03-user-role.png       |
| User attempts to edit another user's expense | User      | 403      | 403    | screenshots/04-user-edit.png       |
| Manager approves expense                     | Manager   | 200      | 200    | screenshots/05-manager-approve.png |
| Manager attempts to change user role         | Manager   | 403      | 403    | screenshots/06-manager-role.png    |
| Admin deletes expense                        | Admin     | 200      | 200    | screenshots/07-admin-delete.png    |
| Admin changes user role                      | Admin     | 200      | 200    | screenshots/08-admin-role.png      |

---

## Summary

The application now implements Role-Based Access Control (RBAC) using a dedicated `requireRole` middleware. Sensitive routes are protected according to the required access model, JWTs include user roles, and ownership checks prevent unauthorized modification of other users' expenses. These changes ensure that employees, managers, and administrators have access only to the functionality appropriate for their roles.
