import { GoogleGenAI, Mode, Models } from "@google/genai";
import { config } from "dotenv";
config();
import fs from "fs"

import client from "./db/redis_client.js";
import { fileNames, colorPalette, libraries } from "./server.js";


// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const cacheKey = `res:${1}`

export default async function generateMeta() {

    console.log(libraries);

    const contents = [{
        text: `Create a JSON profile design system that extracts visual data from these screenshots so that i can use the JSON output in Cursor to give it context on how to replicate such design systems in a consistent style. Avoid including the contents of the specific images. The output should include the design style, the structure and anything that'll help an Al replicate such designs ${colorPalette ? `Integrate the given color palette by mapping it to roles (primary, secondary, accent, background, surface, text, borders, hover, active, disabled). Apply consistently across components (profile cards, buttons, tabs, typography). ${JSON.stringify(colorPalette)}` : ""} ${libraries ? `Use these libraries to create my UI ${JSON.stringify(libraries)}` : ""}
        `
    }]


    console.log("This is the Prompt ", contents[0].text);


    try {

        if (!fileNames) {
            console.warn("There are no files")
            return
        }

        const imageUrl = fileNames[0].map(f => `./uploads/${f}`);

        imageUrl.forEach((img) => {
            const image = fs.readFileSync(img, { encoding: 'base64' })

            contents.push({ inlineData: { mimeType: "image/jpeg", data: image } })
        })


        //! Check in Redis 
        const cachedResponse = await client.get(cacheKey);
        console.log(cachedResponse);
        if (cachedResponse) {
            console.log("Using cached response:");
            const parsedCache = JSON.parse(cachedResponse);
            return parsedCache.response;
        }


        //! Call to Gemini

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: contents,
            config: {

            },
            systemInstruction: {
                parts: [{ text: "You are a helpful assistant called PerfectUI and You help people generate JSON visual data based on the images, Now only generate JSON output not any other text." }]
            }
        })



        const cacheData = JSON.stringify({
            name: imageUrl,
            response: response.text,
            tokens: response.usageMetadata.totalTokenCount
        })

        await client.setEx(cacheKey, 300, cacheData);

        // console.log(response.text);
        console.log(response.usageMetadata);
        console.log("Successfully Set in Redis");
        return response.text;

    } catch (error) {
        console.warn("Error Occurred in " + error);
    }
}
