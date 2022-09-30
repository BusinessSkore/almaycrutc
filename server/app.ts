import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// read static files
app.use(express.static(path.join(__dirname, "..", "..", "dist")));
app.get("*", (req, res) => {res.sendFile(path.join(__dirname, "..", "..", "dist/index.html"));});
export default app;
