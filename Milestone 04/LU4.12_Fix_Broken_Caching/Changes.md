# Cache Improvements

## Issues Found

- Global cache key caused unrelated requests to share cached data.
- Cached null values permanently.
- Missing cache invalidation after POST and DELETE.
- Missing TTL caused stale data and memory growth.
- Missing await resulted in Promise objects being cached.
- Incorrect HTTP status codes.
- Error handling swallowed exceptions.

## Improvements

- Added namespaced cache keys.
- Added TTL to every cache entry.
- Invalidated cache after create and delete.
- Prevented caching null values.
- Fixed async handling.
- Added proper HTTP status codes.
- Refactored cache into a dedicated cache service.

## Result

The application now returns consistent responses.

Deleted tasks disappear immediately.

Memory usage remains controlled because expired cache entries are automatically removed.

The cache improves performance without serving stale or invalid data.