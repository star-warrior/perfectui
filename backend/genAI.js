import { GoogleGenAI, Mode, Models } from "@google/genai";
import { config } from "dotenv";
config();
import fs from "fs"

import client from "./db/redis_client.js";


const contents = [{
    text: "Create a JSON profile design system that extracts visual data from these screenshots so that i can use the JSON output in Cursor to give it context on how to replicate such design systems in a consistent style. Avoid including the contents of the specific images. The output should include the design style, the structure and anything that'll help an Al replicate such designs"
}]

const imageUrl = ["./uploads/Screenshot 2025-08-19 171338.png", "./uploads/Screenshot 2025-08-19 171346.png"]

imageUrl.forEach((img) => {
    const image = fs.readFileSync(img, { encoding: 'base64' })

    contents.push({ inlineData: { mimeType: "image/jpeg", data: image } })
})

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const cacheKey = `res:${1}`

async function main() {

    const cachedResponse = await client.get(cacheKey);

    if (cachedResponse) {
        console.log("Using cached response:");
        const parsedCache = JSON.parse(cachedResponse);
        console.log(JSON.stringify(parsedCache.response));
        return;
    }

    try {

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: contents,
            config: {

            },
            systemInstruction: {
                parts: [{ text: "You are a helpful assistant called PerfectUI and You help people generate JSON visual data based on the images, Now only generate JSON output not any other text." }]
            }
        })

        console.log(response.text);
        console.log(response.usageMetadata);

        const cacheData = JSON.stringify({
            name: imageUrl,
            response: response.text,
            tokens: response.usageMetadata.totalTokenCount
        })

        await client.setEx(cacheKey, 300, cacheData);

        console.log("Successfully Set in Redis");
    } catch (error) {
        console.warn("Error Occurred in " + error);
    } finally {
        return;
    }
}

main();