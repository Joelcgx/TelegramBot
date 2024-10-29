import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";

export function startServer() {
    const APP = express();
    const PORT = process.env.PORT || 3000;

    APP.use(cors());

    // Middleware for serving static resources (CSS, JS, etc.)
    APP.use(express.static(path.join(__dirname, '../web/public/')));

    APP.get("/", (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, "../web/index.html"));
    });


    APP.listen(PORT, () => {
        console.info("Started Server in PORT: ", PORT);
    });

}