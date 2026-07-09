# Security Refactor

## Before

**File**

```
src/App.jsx
```

The OpenAI API key was exposed through:

```javascript
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
```

The frontend directly sent requests to:

```
https://api.openai.com/v1/chat/completions
```

![before](screenshots/before-devtools.png)

### Why this is insecure

Vite variables prefixed with `VITE_` are bundled into the frontend JavaScript. Anyone using browser DevTools can inspect requests and view the Authorization header containing the API key.

---

## Changes

Created

```
backend/services/aiService.js
```

to own all communication with OpenAI.

Added

```
POST /api/summarize
```

to the backend.

Updated the frontend to call only:

```
POST /api/summarize
```

instead of OpenAI directly.

Created

```
backend/.env.example
```

Added

```
OPENAI_API_KEY
```

to backend environment variables.

---

## After

The browser now sends requests only to:

```
/api/summarize
```

There are no requests to:

```
api.openai.com
```

There is no Authorization header visible in DevTools.

![after](screenshots/after-devtools.png)

### Billing Risk

Exposed API keys allow attackers to generate unauthorized OpenAI requests, resulting in potentially significant billing charges for the account owner.