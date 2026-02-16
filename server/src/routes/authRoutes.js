const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const router = express.Router();

// Register a new user endpoing /auth/register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // encrypt the password
  const hashedPassword = bcrypt.hashSync(password, 8);

  // TODO: Store user without password and according to our db
  try {
    const existingUserResult = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
    );

    if (existingUserResult.rowCount > 0) {
      return res.status(409).json({ message: "Username already taken" });
    }

    const userRes = await pool.query(
      "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *",
      [username, hashedPassword],
    );

    const user = userRes.rows[0];

    // create a token
    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

router.post("/login", async (req, res) => {
  // we get their email, and we look up the password associated with that email in the database
  // but we get it back and see it's encrypted, which means that we cannot compare it to the one the user just used trying to login
  // so what we can to do, is again, one way encrypt the password the user just entered

  const { username, password } = req.body;

  try {
    const userRes = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
    );

    // if we cannot find a user associated with that username, return out from the function
    if (userRes.rowCount === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    const user = userRes.rows[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password_hash);

    // if the password does not match, return out of the function
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    // then we have a successful authentication
    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

module.exports = router;
