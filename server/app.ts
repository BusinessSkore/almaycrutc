import express from "express";
var history = require("connect-history-api-fallback");
import morgan from "morgan";
import cors from "cors";
import path from "path";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Fix CannotGet Heroku Vue Router
app.use(
  history({
    // OPTIONAL: Includes more verbose logging
    verbose: true,
  })
);

// read static files
app.use(express.static(path.join(__dirname, "..", "..", "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "dist"));
});
export default app;
