import e from "express"
import axios from "axios"
import cors from "cors";
import { config } from "dotenv";
config();

const app = e();
const PORT = process.env.PORT || 3000;



app.listen(PORT, (req, res) => {
    console.log("App listening on port ", PORT)
})
