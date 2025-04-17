import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { pool } from "./models/db";
import authRoutes from "./routes/auth";
import seatRoutes from "./routes/seats";

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || "5000", 10);

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/seats", seatRoutes);

// Test DB connection
pool
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ DB connection error", err));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
