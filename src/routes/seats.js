const express = require("express");
const { authenticateToken } = require("../middleware/authMiddleware");
const {
  getSeats,
  bookSeats,
  resetSeats,
} = require("../controllers/seatController");

const router = express.Router();

router.get("/", authenticateToken, getSeats);
router.post("/book", authenticateToken, bookSeats);
router.post("/reset", resetSeats);

module.exports = router;
