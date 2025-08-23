// Cache Flow Example for PerfectUI
// ====================================

// Scenario 1: First time with specific images + color palette
const request1 = {
    fileNames: ["design1.png", "design2.png"],
    colorPalette: {
        "color-bg-primary": "#15202b",
        "color-bg-secondary": "#192734",
        "color-white": "#ffffff"
    },
    libraries: ["tailwind", "react"]
};

// Result: Cache MISS -> Calls GenAI -> Stores in cache
// Hash: abc123def456 (generated from images + colors + libs)

// Scenario 2: Same images + same colors (later request)
const request2 = {
    fileNames: ["design1.png", "design2.png"],  // SAME images
    colorPalette: {
        "color-bg-primary": "#15202b",           // SAME colors
        "color-bg-secondary": "#192734",
        "color-white": "#ffffff"
    },
    libraries: ["tailwind", "react"]            // SAME libraries
};

// Result: Cache HIT ✅ -> Returns cached response -> NO GenAI call
// Hash: abc123def456 (same hash as request1)

// Scenario 3: Same images but DIFFERENT colors
const request3 = {
    fileNames: ["design1.png", "design2.png"],  // SAME images
    colorPalette: {
        "color-bg-primary": "#FF0000",           // DIFFERENT colors
        "color-bg-secondary": "#00FF00",
        "color-white": "#0000FF"
    },
    libraries: ["tailwind", "react"]
};

// Result: Cache MISS -> Calls GenAI -> Stores new cache entry
// Hash: xyz789uvw012 (different hash due to different colors)

// Scenario 4: DIFFERENT images but same colors
const request4 = {
    fileNames: ["other1.png", "other2.png"],    // DIFFERENT images
    colorPalette: {
        "color-bg-primary": "#15202b",           // SAME colors as request1
        "color-bg-secondary": "#192734",
        "color-white": "#ffffff"
    },
    libraries: ["tailwind", "react"]
};

// Result: Cache MISS -> Calls GenAI -> Stores new cache entry
// Hash: def456ghi789 (different hash due to different images)

// Key Points:
// 1. Cache key = hash(images + colors + libraries)
// 2. ALL THREE must be identical for cache hit
// 3. If images change but colors stay same = MISS
// 4. If colors change but images stay same = MISS
// 5. File modification time is also checked for cache invalidation

console.log("Cache behavior summary:");
console.log("✅ Cache HIT:  Exact same images + colors + libraries");
console.log("❌ Cache MISS: Any difference in images, colors, or libraries");
console.log("🔄 Cache INVALIDATION: Files modified (different size/time)");
