import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import tweetsRoutes from "./routes/tweet.js";

import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

(async () => await connectDB())();

//middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());

//routes

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tweet", tweetsRoutes);

//port
const PORT = process.env.PORT || 9000;

app.listen(PORT, (req, res) => {
  console.log("listening on port", PORT);
});
