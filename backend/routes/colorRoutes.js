import e from "express";
import axios from "axios";
import path from "path";

const app = e();
const Router = e.Router();

import { colorPalette } from "../server.js";

Router.post("/upload", (req, res) => {
    console.log("Colors Received");

    const response = req.body;

    if (response) {
        // Mutate the colorPalette object instead of reassigning
        Object.keys(colorPalette).forEach(key => delete colorPalette[key]);
        Object.assign(colorPalette, response);
        res.status(200).json({ message: "Colors Received" });
        console.log(response);
    } else {
        res.status(404).json({ message: "Error in Colors" });
    }
})

export default Router;