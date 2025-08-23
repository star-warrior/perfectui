import { GoogleGenAI, Mode, Models } from "@google/genai";
import { config } from "dotenv";
config();
import fs from "fs"

import client from "./db/redis_client.js";
import { fileNames, colorPalette, libraries } from "./server.js";
import cacheSchema from "./cache/redisSchema.js";


// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function generateMeta() {
    console.log('\n🤖 === GenAI Request Started ===');
    console.log('📊 Request Details:', {
        files: fileNames?.[0]?.length || 0,
        fileNames: fileNames?.[0] || [],
        hasColors: !!colorPalette && Object.keys(colorPalette).length > 0,
        colorPalette: colorPalette,
        hasLibraries: !!libraries && libraries.length > 0,
        libraries: libraries
    });

    try {
        if (!fileNames || !fileNames[0] || fileNames[0].length === 0) {
            console.warn("⚠️  No files provided for AI generation");
            return null;
        }

        console.log('🔍 Checking cache for identical images + color palette...');

        // Check cache first using the new schema
        const cachedResponse = await cacheSchema.getCachedResponse(
            fileNames[0],
            colorPalette,
            libraries
        );

        if (cachedResponse) {
            console.log("🎉 USING CACHED RESPONSE - TOKENS SAVED!");
            console.log("✨ Same images + color palette found in cache\n");
            return cachedResponse;
        }

        console.log("📡 No cache found - calling GenAI API...");

        // Prepare content for AI request
        const contents = [{
            text: `Create a JSON profile design system that extracts visual data from these screenshots so that i can use the JSON output in Cursor to give it context on how to replicate such design systems in a consistent style. Avoid including the contents of the specific images. The output should include the design style, the structure and anything that'll help an Al replicate such designs ${colorPalette ? `Integrate the given color palette by mapping it to roles (primary, secondary, accent, background, surface, text, borders, hover, active, disabled). Apply consistently across components (profile cards, buttons, tabs, typography). ${JSON.stringify(colorPalette)}` : ""} ${libraries ? `Use these libraries to create my UI ${JSON.stringify(libraries)}` : ""}`
        }];

        // Add images to content
        const imageUrl = fileNames[0].map(f => `./uploads/${f}`);

        imageUrl.forEach((img) => {
            try {
                const image = fs.readFileSync(img, { encoding: 'base64' });
                contents.push({
                    inlineData: {
                        mimeType: "image/jpeg",
                        data: image
                    }
                });
                console.log(`📷 Added image: ${img}`);
            } catch (error) {
                console.error(`❌ Error reading image ${img}:`, error);
            }
        });

        console.log(`🖼️  Total content prepared: ${contents.length - 1} images + 1 text prompt`);

        // Call Gemini AI
        console.log("🚀 Calling Gemini AI...");
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: contents,
            config: {},
            systemInstruction: {
                parts: [{
                    text: "You are a helpful assistant called PerfectUI and You help people generate JSON visual data based on the images, Now only generate JSON output not any other text."
                }]
            }
        });

        const tokenUsage = {
            totalTokens: response.usageMetadata?.totalTokenCount || 0,
            promptTokens: response.usageMetadata?.promptTokenCount || 0,
            candidatesTokens: response.usageMetadata?.candidatesTokenCount || 0
        };

        console.log("✅ AI Response received:", tokenUsage);

        // Cache the response using the new schema
        console.log("💾 Caching response for future use...");
        await cacheSchema.cacheResponse(
            fileNames[0],
            colorPalette,
            libraries,
            response.text,
            tokenUsage.totalTokens
        );

        console.log("🎯 Response cached successfully!");
        console.log("=== GenAI Request Completed ===\n");

        return response.text;

    } catch (error) {
        console.error("❌ Error occurred in generateMeta:", error);
        throw error;
    }
}
