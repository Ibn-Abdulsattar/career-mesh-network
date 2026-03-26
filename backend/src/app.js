import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes.js"
import connectionRoute from "./routes/connection.routes.js"
import postRoute from "./routes/post.routes.js"
import profileRoute from "./routes/profile.routes.js"
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("PORT", process.env.PORT || 5000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/upload", express.static(path.join(__dirname, "../upload")));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  }),
);

app.get("/api/health", (req, res) => {
  return res.status(200).json({
    message: "Welcome to the Carrer Mesh!",
  });
});

app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoute);
app.use("/api/connections", connectionRoute);
app.use("/api/post", postRoute);


app.use((err, req, res, next) => {
  console.error("🔥 Error:", err);
  const statusCode = err.statusCode || 500;
  const message = err.message || Error.message || "Internal Server Error";
  return res.status(statusCode).json({ message });
});

export { app };
