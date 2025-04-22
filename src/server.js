const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");

const { pool } = require("./models/db");
const authRoutes = require("./routes/auth");
const seatRoutes = require("./routes/seats");

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || "5000", 10);

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/seats", seatRoutes);

// Test DB connection
pool
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ DB connection error", err));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
