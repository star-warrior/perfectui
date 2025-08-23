import express from "express";
import cacheSchema from "../cache/redisSchema.js";

const Router = express.Router();

/**
 * Get cache usage statistics
 */
Router.get("/stats", async (req, res) => {
    try {
        const stats = await cacheSchema.getUsageStats();
        res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error("Error getting cache stats:", error);
        res.status(500).json({
            success: false,
            error: "Failed to retrieve cache statistics"
        });
    }
});

/**
 * List all cached entries
 */
Router.get("/entries", async (req, res) => {
    try {
        const entries = await cacheSchema.listCacheEntries();
        res.status(200).json({
            success: true,
            data: entries,
            count: entries.length
        });
    } catch (error) {
        console.error("Error listing cache entries:", error);
        res.status(500).json({
            success: false,
            error: "Failed to list cache entries"
        });
    }
});

/**
 * Invalidate specific cache entry
 */
Router.delete("/entry/:cacheKey", async (req, res) => {
    try {
        const { cacheKey } = req.params;
        await cacheSchema.invalidateCache(cacheKey);
        res.status(200).json({
            success: true,
            message: `Cache entry ${cacheKey} invalidated successfully`
        });
    } catch (error) {
        console.error("Error invalidating cache entry:", error);
        res.status(500).json({
            success: false,
            error: "Failed to invalidate cache entry"
        });
    }
});

/**
 * Clean up old cache entries
 */
Router.post("/cleanup", async (req, res) => {
    try {
        const { maxAge } = req.body; // Optional max age in milliseconds
        const deletedCount = await cacheSchema.cleanup(maxAge);
        res.status(200).json({
            success: true,
            message: `Cleaned up ${deletedCount} expired cache entries`
        });
    } catch (error) {
        console.error("Error during cache cleanup:", error);
        res.status(500).json({
            success: false,
            error: "Failed to clean up cache"
        });
    }
});

/**
 * Test cache behavior with sample data
 */
Router.post("/test-identical", async (req, res) => {
    try {
        const { fileNames, colorPalette, libraries } = req.body;

        // Generate cache key for this combination
        const cacheKey = cacheSchema.generateCacheKey(fileNames, colorPalette, libraries);

        // Check if this combination exists in cache
        const cachedResponse = await cacheSchema.getCachedResponse(fileNames, colorPalette, libraries);

        res.status(200).json({
            success: true,
            data: {
                cacheKey: cacheKey,
                cacheExists: !!cachedResponse,
                inputs: {
                    fileNames: fileNames || [],
                    colorPalette: colorPalette || {},
                    libraries: libraries || []
                },
                message: cachedResponse
                    ? "✅ Cache hit - identical images and color palette found!"
                    : "❌ No cache found - this combination will trigger GenAI call"
            }
        });
    } catch (error) {
        console.error("Error testing cache:", error);
        res.status(500).json({
            success: false,
            error: "Failed to test cache behavior"
        });
    }
});

/**
 * Force cache a specific request (for testing)
 */
Router.post("/test-cache", async (req, res) => {
    try {
        const { fileNames, colorPalette, libraries, response, tokenCount } = req.body;

        const cacheKey = await cacheSchema.cacheResponse(
            fileNames,
            colorPalette,
            libraries,
            response || "Test response",
            tokenCount || 100
        );

        res.status(200).json({
            success: true,
            cacheKey: cacheKey,
            message: "Test cache entry created successfully"
        });
    } catch (error) {
        console.error("Error creating test cache:", error);
        res.status(500).json({
            success: false,
            error: "Failed to create test cache entry"
        });
    }
});

/**
 * Get detailed cache information for debugging
 */
Router.get("/debug/:cacheKey", async (req, res) => {
    try {
        const { cacheKey } = req.params;
        const metaData = await cacheSchema.getCacheMetadata(cacheKey);

        if (!metaData) {
            return res.status(404).json({
                success: false,
                error: "Cache entry not found"
            });
        }

        res.status(200).json({
            success: true,
            data: {
                cacheKey,
                metadata: metaData,
                age: Date.now() - metaData.timestamp,
                ageFormatted: new Date(Date.now() - metaData.timestamp).toISOString().substr(11, 8)
            }
        });
    } catch (error) {
        console.error("Error getting cache debug info:", error);
        res.status(500).json({
            success: false,
            error: "Failed to get cache debug information"
        });
    }
});

export default Router;
