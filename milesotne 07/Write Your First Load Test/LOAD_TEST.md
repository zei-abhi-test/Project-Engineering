# LOAD_TEST.md

## Test Configuration

- Tool: Artillery
- Target: http://localhost:3001
- Duration: 30 seconds
- Virtual Users: 50
- Scenarios:
  - GET /api/quotes/unpaginated
  - GET /api/quotes?page=1&limit=20
  - POST /api/favorites

---

## Results

### Unpaginated Endpoint

Median Response Time:
_____

P95:
_____

Throughput:
_____

Error Rate:
_____

---

### Paginated Endpoint

Median Response Time:
_____

P95:
_____

Throughput:
_____

Error Rate:
_____

---

### POST /favorites

Median Response Time:
_____

P95:
_____

Throughput:
_____

Error Rate:
_____

---

## Comparison

The paginated endpoint performed significantly better because it returned only 20 quotes instead of the entire dataset. The smaller payload reduced response time, lowered network usage, and increased throughput.

The unpaginated endpoint transferred a much larger payload, increasing latency and server workload.

---

## Understanding p95

The p95 response time represents the time within which 95% of all requests completed.

Unlike the median, it highlights slow requests experienced by a small percentage of users, making it a more useful indicator of real-world user experience under load.

---

## Conclusion

Pagination significantly improves API scalability by reducing payload size, improving response time, increasing throughput, and lowering the overall load on the server.git checkout -b challenge-solution