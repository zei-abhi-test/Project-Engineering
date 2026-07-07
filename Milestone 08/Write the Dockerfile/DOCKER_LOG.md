# DOCKER_LOG.md

# App Analysis

Before writing the Dockerfile, I inspected the application.

## package.json

- Start script:
  ```bash
  npm start
  ```

- Actual command:

  ```bash
  node src/server.js
  ```

- Default port:

  ```
  3000
  ```

## Server

The application starts from:

```
src/server.js
```

The server exposes:

```
GET /health
```

which returns

```json
{
  "status": "ok",
  "timestamp": "..."
}
```

The application uses these environment variables:

- DATABASE_URL
- JWT_SECRET
- PORT

The project uses Prisma, therefore:

```
npx prisma generate
```

must run before the application starts.

---

# Build Log

Build command:

```bash
docker build -t shipapi-backend .
```

After making a small source code change and rebuilding, Docker reused the dependency installation layer.

Example cached output:

```text
=> CACHED [4/7] RUN npm ci --only=production
```

This confirms the Dockerfile follows the layer caching pattern.

---

# Run and Health Check

Container command:

```bash
docker run \
--env-file .env \
-p 3000:3000 \
--name shipapi \
-d \
shipapi-backend
```

Verify running containers:

```bash
docker ps
```

Health check:

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:23:41.000Z"
}
```

HTTP Status:

```
200 OK
```

---

# Observations

If `COPY . .` is executed before `RUN npm ci`, then every source code change invalidates Docker's dependency cache, forcing all packages to be reinstalled on every build. This significantly increases CI/CD build times.

Using the layer caching pattern allows Docker to reuse the dependency layer whenever `package.json` has not changed, making rebuilds much faster.

Using `--env-file .env` keeps sensitive configuration outside the Docker image. Secrets are injected only when the container starts, preventing credentials from being baked into the image or committed to version control.