# Changes.md

## Manual Baseline

### GET /api/quotes/unpaginated

- Response Time: ______
- Payload Size: ______
- Observations:
  - Large payload returned.
  - Slower than paginated endpoint.

---

### GET /api/quotes?page=1&limit=20

- Response Time: ______
- Payload Size: ______
- Observations:
  - Much smaller payload.
  - Faster response.

---

### POST /api/favorites

- Response Time: ______
- Observations:
  - Request accepted successfully.

---

## Unexpected Behaviour

List any issues discovered during manual testing.

Examples:

- Missing CORS headers
- Incorrect totalPages
- Server lag
- Slow response
- Chunked transfer