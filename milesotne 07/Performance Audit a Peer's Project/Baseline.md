# BASELINE.md

## Baseline Metrics

### API

- Response Time:
- Payload Size:
- API Calls:
- DOM Nodes:
- React Commit Duration:

---

## Performance Issues Found

### Backend

1. No pagination.
2. Over-fetching (strategyNote returned unnecessarily).
3. Compression disabled.

### Frontend

1. Double fetch due to missing AbortController.
2. Search filtering recalculated on every render.
3. Unstable callback prevented efficient memoization.

---

## Improvements

### Backend

- Added pagination using page/limit.
- Reduced payload using Prisma select.
- Enabled gzip compression.

### Frontend

- Added AbortController cleanup.
- Memoized search filtering using useMemo.
- Memoized delete handler with useCallback.
- Memoized ScoreCard with React.memo.

---

## Conclusion

The application now loads significantly less data, performs only a single request during page load, performs search efficiently, and avoids unnecessary component re-renders.