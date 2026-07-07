# DEPLOYMENT_LOG.md

# Deployment Issues

## 1. Frontend API URL

### Problem

The frontend displayed:

API URL: undefined

because `VITE_API_URL` was not configured during the Vite build.

### Root Cause

Vite injects environment variables only during the build phase. Without the variable, the compiled application permanently contained `undefined`.

### Fix

Added `VITE_API_URL` to the frontend service in `render.yaml`.

---

## 2. Prisma Client

### Problem

The backend crashed during the first database request.

### Root Cause

The Prisma Client had never been generated in the deployment environment.

### Fix

Updated the backend build command to execute:

```

npx prisma generate
npx prisma migrate deploy

```

before starting the server.

---

## 3. CORS

### Problem

Browser Console displayed:

```

Access to fetch has been blocked by CORS policy

```

### Root Cause

The backend used

```

origin: "*"

```

while authenticated requests included credentials.

Browsers reject wildcard origins when credentials are enabled.

### Fix

Configured Express CORS using

```

origin: process.env.CORS_ORIGIN,
credentials: true

```

The frontend origin is now injected using an environment variable.

---

# Verification

After redeployment:

- API URL resolved correctly.
- Login requests succeeded.
- Preflight OPTIONS requests returned 200.
- Bookmark creation worked successfully.
- Prisma queries executed normally.