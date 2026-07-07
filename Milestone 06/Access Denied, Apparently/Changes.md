# Changes.md

# Investigation Findings

## 1. Unauthorized Event Discovery

The `GET /api/events` endpoint returned every event stored in memory without checking whether the authenticated user was the creator or an invited guest.

### Impact

Any logged-in user could discover private events belonging to other users.

---

## 2. Private Event Detail Disclosure

The `GET /api/events/:id` endpoint returned the complete event information to any authenticated user who knew the event ID.

No authorization check was performed before returning the event.

### Impact

Private event details such as the description, invited guests, and RSVP information could be viewed by unauthorized users.

---

## 3. RSVP Authorization Bypass

The RSVP endpoint accepted requests from any authenticated user.

It did not verify:

* whether the user had been invited
* whether the user had already RSVPed

### Impact

Unauthorized users could RSVP to private events, and invited users could submit multiple RSVPs.

---

## 4. Unauthorized Event Deletion

The delete endpoint removed events without checking ownership.

### Impact

Any authenticated user could delete another user's private event.

---

## 5. Misleading User Interface

The frontend always displayed the RSVP and Delete buttons whenever a user was logged in.

The buttons were not rendered based on actual permissions.

### Impact

Users were encouraged to perform actions they were not authorized to execute.

---

# Root Cause

The application authenticated users successfully but failed to perform authorization checks before exposing protected resources. Backend routes trusted every authenticated user equally, while the frontend displayed privileged actions without considering ownership or invitation status.

---

# What I Fixed

## Event List

Filtered the event list so users only receive events where they are:

* the creator
* or an invited guest

---

## Event Detail

Added authorization checks before returning event details.

Only:

* the event creator
* invited users

can access private event information.

Unauthorized users now receive:

```text
403 Forbidden
```

---

## RSVP

Added two validations:

* user must be invited
* user must not have already RSVPed

Unauthorized users receive **403 Forbidden**, while duplicate RSVPs return **400 Bad Request**.

---

## Delete

Added an ownership check.

Only the event creator can delete an event.

Other users receive **403 Forbidden**.

---

## Frontend

Updated the UI to use the permission flags returned by the backend.

* RSVP button is displayed only when:

  * user is invited
  * user has not already RSVPed

* Delete button is displayed only when:

  * user is the creator

Unauthorized actions are hidden from the interface.

---

# Verification

| Scenario                                  | Expected        | Result |
| ----------------------------------------- | --------------- | ------ |
| User sees only created/invited events     | Pass            | ✅      |
| Uninvited user opens private event        | 403 Forbidden   | ✅      |
| Uninvited user attempts RSVP              | 403 Forbidden   | ✅      |
| Duplicate RSVP                            | 400 Bad Request | ✅      |
| Non-creator deletes event                 | 403 Forbidden   | ✅      |
| Creator deletes own event                 | 200 OK          | ✅      |
| RSVP button hidden for unauthorized users | Pass            | ✅      |
| Delete button hidden for non-creators     | Pass            | ✅      |

---

# Summary

This update enforces proper authorization throughout the Event Manager application. Users can now access only events they own or are invited to, private event information is protected, RSVP actions are restricted to invited guests, duplicate RSVPs are prevented, event deletion is limited to creators, and the frontend displays actions only when the authenticated user has permission to perform them.
