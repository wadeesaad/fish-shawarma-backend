const express = require("express");
const router = express.Router();

// TEMP ADMIN USER (NO DATABASE YET)
const adminUser = {
  username: "admin",
  password: "1234"
};

// POST /login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // 1. Validate input
  if (!username || !password) {
    return res.status(400).json("Invalid input");
  }

  // 2. Check credentials
  if (
    username !== adminUser.username ||
    password !== adminUser.password
  ) {
    return res
      .status(401)
      .json("Invalid username or password");
  }

  // 3. Send token (temporary)
  const token = "admin-token-123";

  res.json(token);
});

module.exports = router;
