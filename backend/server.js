import e from "express"
import axios from "axios"
import cors from "cors";
import { config } from "dotenv";
config();
import fs from "fs";

// Custom Routes

import imageRoutes from "./routes/imageRoutes.js"

const app = e();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:5173",
    allowedHeaders: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}))


app.use("/api/image", imageRoutes)


if (!fs.existsSync('uploads')) fs.mkdirSync('uploads')

app.listen(PORT, (req, res) => {
    console.log("App listening on port ", PORT)
})
