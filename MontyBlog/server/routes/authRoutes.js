// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const router = express.Router();

// // Register
// router.post("/register", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ message: "Username already exists" });
//     }

//     await User.create({ username, password });

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Login
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: user._id, username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.cookie("token", token, {
//       secure: process.env.NODE_ENV === "production",
//     });

//     res.json({
//       message: "Login successful",
//       username: username,
//       userId: user._id,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Logout
// router.post("/logout", (req, res) => {
//   res.clearCookie("token");
//   res.json({ message: "Logout successful" });
// });

// module.exports = router;

// ///////////////////////////
// //////////////////
// ///////////////////////////
// ////////////////////////////
// /////////////////////////
// //////////////////////////

// ADDING SWAGGER

// routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Username already exists
 */
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    await User.create({ username, password });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 username:
 *                   type: string
 *                 userId:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });

    res.json({
      message: "Login successful",
      username: username,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout the user
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
});

module.exports = router;
