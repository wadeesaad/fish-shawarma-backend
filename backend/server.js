import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

// ================= DATABASE =================
let db;

async function startServer() {
  try {
    db = await mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "fish_shawarma_db",
      waitForConnections: true,
      connectionLimit: 10,
    });

    await db.execute("SELECT 1");
    console.log("✅ Connected to database");

    // 🔥 FORCE ADMIN PASSWORD RESET
    const hashed = await bcrypt.hash("12345", 10);
    await db.execute(
      "UPDATE admin_users SET password = ? WHERE username = 'admin'",
      [hashed]
    );

    console.log("🔑 Admin password = 12345");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`✅ Server running on port ${PORT}`)
    );
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}

startServer();

// ================= JWT MIDDLEWARE =================
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const token = authHeader.split(" ")[1];
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
};

// ================= LOGIN =================
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const [users] = await db.execute(
    "SELECT * FROM admin_users WHERE username = ?",
    [username]
  );

  if (users.length === 0) {
    return res.status(401).json({ message: "Invalid login" });
  }

  const user = users[0];
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({ message: "Invalid login" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: "admin" },
    JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.json({
    success: true,
    token,
    user: { username: user.username, role: "admin" },
  });
});

// ================= DISHES =================

// ➕ ADD DISH (ADMIN)
app.post("/api/dishes", verifyToken, async (req, res) => {
  const { name, ingredients, price } = req.body;

  if (!name || !ingredients || !price) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const [result] = await db.execute(
    "INSERT INTO dishes (name, ingredients, price) VALUES (?, ?, ?)",
    [name, ingredients, price]
  );

  res.json({ success: true, id: result.insertId });
});

// 📄 GET DISHES (PUBLIC)
app.get("/api/dishes", async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM dishes");
  res.json(rows);
});

// 🗑️ DELETE DISH (ADMIN)
app.delete("/api/dishes/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  await db.execute("DELETE FROM dishes WHERE id = ?", [id]);

  res.json({ success: true });
});
