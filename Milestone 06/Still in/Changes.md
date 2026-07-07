# Changes.md

# Investigation Findings

## 1. Expired Token Returns Wrong HTTP Status

The authentication middleware returned **500 Internal Server Error** whenever JWT verification failed, including when the token had simply expired.

**Problem**

* Expired sessions were treated as server failures.
* The frontend could not distinguish between an expired session and a real server error.
* Users remained on the dashboard with an invalid session.

---

## 2. Duplicate Voting Check Failed

The application stored **user IDs** in the `votedUserIds` array but compared them against `req.user.email`.

### Before

```javascript
const alreadyVoted = votedUserIds.find(id => id === req.user.email);
```

### Result

Since a numeric/string user ID never equals an email address, the comparison always failed, allowing users to vote multiple times.

---

## 3. Frontend Ignored Authentication Errors

The Axios client did not include a global response interceptor.

When the backend returned **401 Unauthorized**, the application:

* kept the expired token in localStorage
* stayed on the dashboard
* continued making authenticated requests
* forced every component to handle authentication separately

---

## 4. Polling Continued After Session Expired

The dashboard refreshed poll results every 10 seconds using `setInterval()`.

When authentication failed:

* polling continued indefinitely
* repeated failed API requests were sent
* unnecessary network traffic was generated
* users remained on an invalid session

---

# Root Cause

The backend incorrectly treated expired JWTs as internal server errors instead of authentication failures. At the same time, the frontend had no centralized mechanism for handling authentication failures, allowing expired sessions to remain active while background polling continued. Additionally, duplicate vote prevention compared different data types, making the validation ineffective.

---

# What I Fixed

## Authentication Middleware

* Detect `TokenExpiredError`.
* Return **401 Unauthorized** instead of **500 Internal Server Error**.
* Return a clear session expiry message.

---

## Duplicate Vote Prevention

Replaced:

```javascript
votedUserIds.find(id => id === req.user.email)
```

with

```javascript
votedUserIds.includes(userId)
```

This now compares values of the same type and correctly prevents duplicate voting.

---

## Axios Global Error Handling

Added a response interceptor that:

* detects HTTP 401 responses
* removes the stored JWT
* redirects users to the login page

This centralizes authentication error handling across the application.

---

## Polling Cleanup

When authentication fails:

* the polling interval is cleared using `clearInterval()`
* polling immediately stops
* the user is redirected to login

Manual logout also clears the polling interval.

---

# Verification

## Before Fix

* Expired token returned **500 Internal Server Error**
* Dashboard remained active after session expiry
* Polling continued every 10 seconds
* Duplicate votes were accepted

---

## After Fix

* Expired token returns **401 Unauthorized**
* User is redirected to the login page
* JWT is removed from localStorage
* Polling stops immediately after session expiry
* Duplicate votes are blocked correctly

---

# Screenshots

* before-token-expiry.png
* after-token-expiry.png
* before-dashboard.png
* after-dashboard.png
* polling-stopped-console.png (optional)

---

# Summary

The application now correctly handles expired authentication sessions by returning the appropriate HTTP status code, preventing duplicate voting through type-safe validation, globally handling unauthorized responses on the frontend, and stopping unnecessary polling after session expiry. These changes improve both application security and user experience.
