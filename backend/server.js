import e from "express"
import bodyParser from "body-parser";
import axios from "axios"
import cors from "cors";
import { config } from "dotenv";
config();
import fs from "fs";
import session from "express-session";
import passport from "passport";
import { RedisStore } from "connect-redis";

import client from "./db/redis_client.js";

// Custom Routes

import imageRoutes from "./routes/imageRoutes.js"
import colorRoutes from "./routes/colorRoutes.js"
import cacheRoutes from "./routes/cacheRoutes.js"
import generateMeta from "./genAI.js";
import authRoutes from "./auth/auth.js"
import cacheSchema from "./cache/redisSchema.js";

const app = e();
const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}))

app.use(session({
    store: new RedisStore({ client: client }),
    secret: process.env.SESSION_SECRET || "your_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


export let fileNames = [];
export let colorPalette = {}
export let libraries = [];


app.use("/api/image", imageRoutes)

app.use("/api/color", colorRoutes)

app.use("/api/cache", cacheRoutes)

app.use("/auth", authRoutes);

app.post("/api/libraries/upload", (req, res) => {

    libraries = req.body.libraries

    console.log(libraries);
    res.status(200).json({ message: "Recieved Libs" });

})

app.get("/api/genAI", async (req, res) => {
    try {
        // console.log("Gen AI Called");
        const aiRes = await generateMeta();
        // console.log(aiRes);
        if (aiRes) {
            res.status(200).json({ message: aiRes });
        } else {
            res.status(500).json({ error: "No AI response generated." });
        }
    } catch (err) {
        console.error("Error in /api/genAI:", err);
        res.status(500).json({ error: "Internal server error." });
    }
});

// Health check endpoint with cache status
app.get("/api/health", async (req, res) => {
    try {
        const cacheStats = await cacheSchema.getUsageStats();

        res.status(200).json({
            status: "healthy",
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            cache: {
                connected: true,
                stats: cacheStats
            },
            environment: process.env.NODE_ENV || "development"
        });
    } catch (error) {
        console.error("Health check error:", error);
        res.status(500).json({
            status: "unhealthy",
            timestamp: new Date().toISOString(),
            error: error.message
        });
    }
});

if (!fs.existsSync('uploads')) fs.mkdirSync('uploads')

// Initialize cache and cleanup on startup
async function initializeServer() {
    try {
        console.log("🚀 Initializing PerfectUI Server...");

        // Clean up old cache entries on startup
        const cleanedCount = await cacheSchema.cleanup();
        console.log(`🧹 Startup cleanup: ${cleanedCount} expired cache entries removed`);

        // Get initial cache stats
        const stats = await cacheSchema.getUsageStats();
        console.log("📊 Current cache stats:", stats);

    } catch (error) {
        console.error("❌ Error during server initialization:", error);
    }
}

app.listen(PORT, async (req, res) => {
    console.log("🌟 PerfectUI Server listening on port", PORT);
    await initializeServer();
})
