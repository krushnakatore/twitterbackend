import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";

const app = express();
dotenv.config();

(async () => await connectDB())();

//middleware
app.use(cors());
app.use(express.json());

//routes

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);

//port
const PORT = process.env.PORT || 9000;

app.listen(PORT, (req, res) => {
  console.log("listening on port", PORT);
});
