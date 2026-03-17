import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes.js"
const app = express();

dotenv.config();
app.set("PORT", process.env.PORT || 5000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

app.use("/api/auth", userRoute);


app.use((err, req, res, next) => {
  console.error("🔥 Error:", err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ message });
});

export { app };
