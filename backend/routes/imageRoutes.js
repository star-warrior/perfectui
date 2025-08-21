import e from "express";
import axios from "axios";
import multer from "multer";
import path from "path"

import { fileNames } from "../server.js";

const app = e();
const Router = e.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // folder to save images
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

Router.post('/upload', (upload.array('images', 10)), (req, res) => {

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
    }

    fileNames.length = 0
    fileNames.push(req.files.map(f => f.filename))

    // console.log("Uploaded files:", req.files);
    res.status(200).json({
        message: "Files uploaded successfully",
        files: req.files.map(f => f.filename)
    });

})


export default Router;