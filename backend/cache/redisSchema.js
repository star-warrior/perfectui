import crypto from 'crypto';
import client from '../db/redis_client.js';

/**
 * Redis Schema for GenAI Caching
 * 
 * Key Structure:
 * - genai:request:{hash} -> Full request cache
 * - genai:meta:{hash} -> Metadata (timestamp, token count, etc.)
 * - genai:files:{hash} -> File signatures for cache invalidation
 * - genai:stats -> Usage statistics
 */

class GenAICacheSchema {
    constructor() {
        this.prefixes = {
            REQUEST: 'genai:request:',
            META: 'genai:meta:',
            FILES: 'genai:files:',
            STATS: 'genai:stats'
        };
        this.defaultTTL = 60 * 60 * 24 * 7; // 7 days
    }

    /**
     * Generate a unique hash for cache key based on inputs
     * Primary focus: Images + Color Palette combination
     */
    generateCacheKey(fileNames, colorPalette, libraries) {
        const input = {
            // Primary cache factors (most important)
            files: fileNames?.sort() || [],
            colors: this.normalizeColorPalette(colorPalette),
            // Secondary factor (libraries can change without affecting image/color analysis)
            libs: libraries?.sort() || []
        };

        const hash = crypto
            .createHash('sha256')
            .update(JSON.stringify(input))
            .digest('hex')
            .substring(0, 16); // Use first 16 chars for shorter keys

        console.log(`🔑 Generated cache key: ${hash} for:`, {
            fileCount: fileNames?.length || 0,
            hasColors: !!(colorPalette && Object.keys(colorPalette).length > 0),
            colorKeys: colorPalette ? Object.keys(colorPalette).length : 0,
            libCount: libraries?.length || 0
        });

        return hash;
    }

    /**
     * Normalize color palette for consistent hashing
     */
    normalizeColorPalette(palette) {
        if (!palette || typeof palette !== 'object') return {};

        const normalized = {};
        Object.keys(palette)
            .sort()
            .forEach(key => {
                normalized[key] = palette[key];
            });

        return normalized;
    }

    /**
     * Store GenAI response in cache
     */
    async cacheResponse(fileNames, colorPalette, libraries, response, tokenCount) {
        try {
            const cacheKey = this.generateCacheKey(fileNames, colorPalette, libraries);
            const timestamp = Date.now();

            // Store the actual response
            const responseData = {
                response: response,
                timestamp: timestamp,
                inputs: {
                    fileNames: fileNames || [],
                    colorPalette: colorPalette || {},
                    libraries: libraries || []
                }
            };

            // Store metadata
            const metaData = {
                tokenCount: tokenCount || 0,
                timestamp: timestamp,
                fileCount: fileNames?.length || 0,
                hasColors: !!(colorPalette && Object.keys(colorPalette).length > 0),
                hasLibraries: !!(libraries && libraries.length > 0)
            };

            // File signatures for cache invalidation
            const fileSignatures = await this.generateFileSignatures(fileNames);

            // Execute all cache operations in a pipeline for atomicity
            const pipeline = client.multi();

            pipeline.setEx(
                `${this.prefixes.REQUEST}${cacheKey}`,
                this.defaultTTL,
                JSON.stringify(responseData)
            );

            pipeline.setEx(
                `${this.prefixes.META}${cacheKey}`,
                this.defaultTTL,
                JSON.stringify(metaData)
            );

            pipeline.setEx(
                `${this.prefixes.FILES}${cacheKey}`,
                this.defaultTTL,
                JSON.stringify(fileSignatures)
            );

            await pipeline.exec();

            // Update usage statistics
            await this.updateStats(tokenCount);

            console.log(`✅ Cached GenAI response with key: ${cacheKey}`);
            return cacheKey;

        } catch (error) {
            console.error('❌ Error caching GenAI response:', error);
            throw error;
        }
    }

    /**
     * Retrieve cached response based on images and color palette
     */
    async getCachedResponse(fileNames, colorPalette, libraries) {
        try {
            const cacheKey = this.generateCacheKey(fileNames, colorPalette, libraries);

            console.log(`🔍 Looking for cached response with key: ${cacheKey}`);

            // Check if cached response exists
            const cachedResponse = await client.get(`${this.prefixes.REQUEST}${cacheKey}`);

            if (!cachedResponse) {
                console.log(`❌ No cache found - will call GenAI`);
                return null;
            }

            // Validate file signatures to ensure files haven't changed
            const isValid = await this.validateFileSignatures(cacheKey, fileNames);
            if (!isValid) {
                console.log(`⚠️  Cache invalidated - files have changed, will call GenAI`);
                await this.invalidateCache(cacheKey);
                return null;
            }

            const responseData = JSON.parse(cachedResponse);
            const metaData = await this.getCacheMetadata(cacheKey);

            console.log(`✅ CACHE HIT! Using cached response for key: ${cacheKey}`, {
                age: `${Math.round((Date.now() - responseData.timestamp) / 60000)}min`,
                tokensSaved: metaData?.tokenCount || 0,
                originalRequest: {
                    fileCount: responseData.inputs?.fileNames?.length || 0,
                    hasColors: !!(responseData.inputs?.colorPalette && Object.keys(responseData.inputs.colorPalette).length > 0)
                }
            });

            // Update usage statistics
            await this.updateStats(0, metaData?.tokenCount || 0);

            return responseData.response;

        } catch (error) {
            console.error('❌ Error retrieving cached response:', error);
            return null;
        }
    }

    /**
     * Generate file signatures for cache invalidation
     */
    async generateFileSignatures(fileNames) {
        if (!fileNames || fileNames.length === 0) return {};

        const signatures = {};
        const fs = await import('fs');

        for (const fileName of fileNames) {
            try {
                const filePath = `./uploads/${fileName}`;
                if (fs.existsSync(filePath)) {
                    const stats = fs.statSync(filePath);
                    signatures[fileName] = {
                        size: stats.size,
                        mtime: stats.mtime.getTime()
                    };
                }
            } catch (error) {
                console.error(`Error generating signature for ${fileName}:`, error);
            }
        }

        return signatures;
    }

    /**
     * Validate file signatures
     */
    async validateFileSignatures(cacheKey, currentFileNames) {
        try {
            const cachedSignatures = await client.get(`${this.prefixes.FILES}${cacheKey}`);
            if (!cachedSignatures) return false;

            const signatures = JSON.parse(cachedSignatures);
            const currentSignatures = await this.generateFileSignatures(currentFileNames);

            // Compare signatures
            return JSON.stringify(signatures) === JSON.stringify(currentSignatures);

        } catch (error) {
            console.error('Error validating file signatures:', error);
            return false;
        }
    }

    /**
     * Get cache metadata
     */
    async getCacheMetadata(cacheKey) {
        try {
            const metaData = await client.get(`${this.prefixes.META}${cacheKey}`);
            return metaData ? JSON.parse(metaData) : null;
        } catch (error) {
            console.error('Error getting cache metadata:', error);
            return null;
        }
    }

    /**
     * Invalidate specific cache entry
     */
    async invalidateCache(cacheKey) {
        try {
            const pipeline = client.multi();
            pipeline.del(`${this.prefixes.REQUEST}${cacheKey}`);
            pipeline.del(`${this.prefixes.META}${cacheKey}`);
            pipeline.del(`${this.prefixes.FILES}${cacheKey}`);
            await pipeline.exec();

            console.log(`🗑️  Invalidated cache for key: ${cacheKey}`);
        } catch (error) {
            console.error('Error invalidating cache:', error);
        }
    }

    /**
     * Update usage statistics
     */
    async updateStats(tokensUsed = 0, tokensSaved = 0) {
        try {
            const pipeline = client.multi();

            if (tokensUsed > 0) {
                pipeline.hIncrBy(this.prefixes.STATS, 'totalTokensUsed', tokensUsed);
                pipeline.hIncrBy(this.prefixes.STATS, 'totalRequests', 1);
            }

            if (tokensSaved > 0) {
                pipeline.hIncrBy(this.prefixes.STATS, 'totalTokensSaved', tokensSaved);
                pipeline.hIncrBy(this.prefixes.STATS, 'cacheHits', 1);
            }

            pipeline.hSet(this.prefixes.STATS, 'lastUpdated', Date.now());
            await pipeline.exec();

        } catch (error) {
            console.error('Error updating stats:', error);
        }
    }

    /**
     * Get usage statistics
     */
    async getUsageStats() {
        try {
            const stats = await client.hGetAll(this.prefixes.STATS);

            return {
                totalTokensUsed: parseInt(stats.totalTokensUsed) || 0,
                totalTokensSaved: parseInt(stats.totalTokensSaved) || 0,
                totalRequests: parseInt(stats.totalRequests) || 0,
                cacheHits: parseInt(stats.cacheHits) || 0,
                cacheHitRate: stats.totalRequests > 0
                    ? ((parseInt(stats.cacheHits) || 0) / parseInt(stats.totalRequests) * 100).toFixed(2) + '%'
                    : '0%',
                lastUpdated: stats.lastUpdated ? new Date(parseInt(stats.lastUpdated)).toISOString() : null
            };

        } catch (error) {
            console.error('Error getting usage stats:', error);
            return null;
        }
    }

    /**
     * Clean up expired or old cache entries
     */
    async cleanup(maxAge = 30 * 24 * 60 * 60 * 1000) { // 30 days default
        try {
            const pattern = `${this.prefixes.REQUEST}*`;
            const keys = await client.keys(pattern);
            let deletedCount = 0;

            for (const key of keys) {
                const cacheKey = key.replace(this.prefixes.REQUEST, '');
                const metaData = await this.getCacheMetadata(cacheKey);

                if (metaData && (Date.now() - metaData.timestamp) > maxAge) {
                    await this.invalidateCache(cacheKey);
                    deletedCount++;
                }
            }

            console.log(`🧹 Cleaned up ${deletedCount} expired cache entries`);
            return deletedCount;

        } catch (error) {
            console.error('Error during cache cleanup:', error);
            return 0;
        }
    }

    /**
     * List all cached entries
     */
    async listCacheEntries() {
        try {
            const pattern = `${this.prefixes.META}*`;
            const keys = await client.keys(pattern);
            const entries = [];

            for (const key of keys) {
                const cacheKey = key.replace(this.prefixes.META, '');
                const metaData = await client.get(key);

                if (metaData) {
                    const parsed = JSON.parse(metaData);
                    entries.push({
                        cacheKey,
                        ...parsed,
                        age: Date.now() - parsed.timestamp
                    });
                }
            }

            return entries.sort((a, b) => b.timestamp - a.timestamp);

        } catch (error) {
            console.error('Error listing cache entries:', error);
            return [];
        }
    }
}

export default new GenAICacheSchema();
