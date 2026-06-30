# Bug Report

## Bug 1 – Empty submissions allowed

### Root Cause
The validate() function always returns true and the result is ignored inside handleSubmit().

---

## Bug 2 – Double submission

### Root Cause
loading is never set before the API request and the submit button is never disabled.

---

## Bug 3 – Form never resets

### Root Cause
The form state is never restored to its initial values after a successful submission.

---

## Bug 4 – Silent server errors

### Root Cause
The catch block swallows every error and never updates serverError or field errors.

---

## Bug 5 – No field validation

### Root Cause
The errors state is never populated or rendered beside inputs.

---

## Bug 6 – Invalid step count

### Root Cause
validate() never checks whether stepsCount is greater than zero.

---

Deployment URL

(Add after deployment)