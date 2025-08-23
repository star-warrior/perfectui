# Redis Schema for GenAI Caching

This document explains the Redis caching schema implemented for the PerfectUI GenAI system to optimize token usage and improve response times.

## Overview

The Redis schema is designed to cache GenAI responses efficiently while ensuring cache invalidation when inputs change. This prevents redundant API calls and saves tokens when the same combination of files, colors, and libraries is processed multiple times.

## Schema Structure

### Key Patterns

```
genai:request:{hash}  -> Cached AI response data
genai:meta:{hash}     -> Metadata (tokens, timestamp, etc.)
genai:files:{hash}    -> File signatures for cache invalidation
genai:stats           -> Global usage statistics
```

### Hash Generation

The cache key hash is generated based on:

- **File names** (sorted for consistency)
- **Color palette** (normalized and sorted)
- **Libraries** (sorted array)

This ensures the same inputs always produce the same cache key.

## Features

### 1. Intelligent Cache Invalidation

- **File Signatures**: Tracks file size and modification time
- **Automatic Invalidation**: Cache is invalidated if files change
- **Input Validation**: Ensures cached responses match current inputs

### 2. Usage Statistics

Tracks:

- Total tokens used vs saved
- Cache hit rate
- Total requests
- Last updated timestamp

### 3. Administrative Features

- **Cleanup**: Remove expired entries
- **Monitoring**: View all cache entries and their metadata
- **Manual Invalidation**: Remove specific cache entries
- **Debug Information**: Detailed cache entry analysis

## API Endpoints

### Cache Management

```javascript
// Get usage statistics
GET /api/cache/stats

// List all cache entries
GET /api/cache/entries

// Invalidate specific entry
DELETE /api/cache/entry/:cacheKey

// Cleanup old entries
POST /api/cache/cleanup

// Debug cache entry
GET /api/cache/debug/:cacheKey
```

### Example Response

```json
{
  "success": true,
  "data": {
    "totalTokensUsed": 15420,
    "totalTokensSaved": 8760,
    "totalRequests": 45,
    "cacheHits": 12,
    "cacheHitRate": "26.67%",
    "lastUpdated": "2025-08-23T10:30:00.000Z"
  }
}
```

## Usage Example

### Backend Integration

```javascript
import cacheSchema from "./cache/redisSchema.js";

// Check cache before AI call
const cachedResponse = await cacheSchema.getCachedResponse(
  fileNames,
  colorPalette,
  libraries
);

if (cachedResponse) {
  return cachedResponse; // Use cached response
}

// Make AI call
const response = await ai.generateContent(/*...*/);

// Cache the response
await cacheSchema.cacheResponse(
  fileNames,
  colorPalette,
  libraries,
  response.text,
  response.usageMetadata.totalTokenCount
);
```

### Frontend Monitoring

Use the `CacheDashboard` component to monitor cache performance:

```jsx
import CacheDashboard from "./components/CacheDashboard";

// Add to your admin panel or development tools
<CacheDashboard />;
```

## Configuration

### Environment Variables

```bash
# Redis connection (default: localhost:6379)
REDIS_URL=redis://localhost:6379

# Cache TTL (Time To Live) - default: 7 days
CACHE_TTL=604800
```

### Customization

Modify `redisSchema.js` to adjust:

- **TTL Settings**: Change `defaultTTL` value
- **Cache Key Strategy**: Modify `generateCacheKey()` method
- **Cleanup Intervals**: Adjust `cleanup()` max age parameter

## Best Practices

### 1. Monitor Cache Performance

- Check cache hit rate regularly
- Monitor token savings
- Review cache entry count

### 2. Maintenance

- Run periodic cleanup to remove expired entries
- Monitor Redis memory usage
- Set appropriate TTL values

### 3. Development

- Use cache debug endpoints for troubleshooting
- Test cache invalidation with file changes
- Monitor cache behavior during development

## Benefits

### Token Savings

- **Reduced API Calls**: Avoid redundant requests
- **Cost Optimization**: Save on API token costs
- **Performance**: Faster response times for cached requests

### Reliability

- **File Change Detection**: Automatic cache invalidation
- **Atomic Operations**: Redis pipelines ensure data consistency
- **Error Handling**: Graceful fallback on cache failures

## Troubleshooting

### Common Issues

1. **Cache Not Working**

   - Check Redis connection
   - Verify cache key generation
   - Check file permissions

2. **High Memory Usage**

   - Run cache cleanup
   - Adjust TTL settings
   - Monitor cache entry count

3. **Cache Invalidation Issues**
   - Verify file signature generation
   - Check file modification times
   - Review cache key consistency

### Debug Commands

```bash
# Check Redis connection
redis-cli ping

# List all cache keys
redis-cli keys "genai:*"

# Get cache statistics
curl http://localhost:8080/api/cache/stats

# View cache entries
curl http://localhost:8080/api/cache/entries
```

## Performance Metrics

The schema tracks key performance indicators:

- **Cache Hit Rate**: Percentage of requests served from cache
- **Token Savings**: Total tokens saved by using cache
- **Response Time**: Improved performance for cached requests
- **Memory Usage**: Redis memory consumption

Monitor these metrics to optimize cache performance and ensure efficient token usage.
