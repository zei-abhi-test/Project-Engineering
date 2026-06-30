# AUTH BUGS REPORT

## Observed Behaviour

### Bug 1
Navigating directly to `/dashboard`, `/settings`, or `/profile` without logging in still loads those pages.

### Bug 2
After logging in, refreshing the page logs the user out because authentication is not restored.

### Bug 3
Private routes are not protected. Any user can access them directly by URL.

### Bug 4
Navbar always displays the Login button and never updates after login or logout.

---

# Root Cause Analysis

## Bug 1
AuthProvider is not wrapping the application in `main.jsx`.

## Bug 2
AuthContext never stores the token or user in localStorage and never restores them.

## Bug 3
App.jsx does not wrap protected pages inside a ProtectedRoute component.

## Bug 4
Navbar never calls `useAuth()` and therefore ignores authentication state.

---

# Fixes Applied

(To be completed after implementation.)

---

Live Deployment

(Add after deployment.)