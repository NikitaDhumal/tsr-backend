const { pool } = require("../models/db");

const getSeats = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM seats ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching seats:", error);
    res.status(500).json({ message: "Failed to fetch seats" });
  }
};

const bookSeats = async (req, res) => {
  const { user } = req;
  const { seats } = req.body;

  if (!Array.isArray(seats) || seats.length < 1 || seats.length > 7) {
    return res
      .status(400)
      .json({ message: "You can book between 1 to 7 seats." });
  }

  try {
    const result = await pool.query(
      "SELECT id FROM seats WHERE id = ANY($1) AND booked_by IS NULL",
      [seats]
    );

    if (result.rows.length !== seats.length) {
      return res
        .status(400)
        .json({ message: "Some seats are already booked." });
    }

    for (let id of seats) {
      await pool.query("UPDATE seats SET booked_by = $1 WHERE id = $2", [
        user?.id,
        id,
      ]);
    }

    res.status(200).json({ message: "Seats booked successfully", seats });
  } catch (error) {
    console.error("Booking failed:", error);
    res.status(500).json({ message: "Booking failed" });
  }
};

const resetSeats = async (req, res) => {
  try {
    await pool.query("UPDATE seats SET booked_by = NULL");
    res.status(200).json({ message: "All bookings have been reset." });
  } catch (error) {
    console.error("Reset failed:", error);
    res.status(500).json({ message: "Failed to reset bookings." });
  }
};

module.exports = {
  getSeats,
  bookSeats,
  resetSeats,
};
