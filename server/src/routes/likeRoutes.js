const express = require("express");
const router = express.Router();
const pool = require("../db");

// Toggle like
router.post("", async (req, res) => {
  try {
    const { post_id } = req.body;
    const user_id = req.user.id;

    // Check if already liked
    const existing = await pool.query(
      "SELECT * FROM Likes WHERE user_id = $1 AND post_id = $2",
      [user_id, post_id],
    );

    if (existing.rows.length > 0) {
      // Unlike
      await pool.query(
        "DELETE FROM Likes WHERE user_id = $1 AND post_id = $2",
        [user_id, post_id],
      );
      return res.json({ liked: false });
    } else {
      // Like
      await pool.query("INSERT INTO Likes (user_id, post_id) VALUES ($1, $2)", [
        user_id,
        post_id,
      ]);
      return res.json({ liked: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get likes
router.get("", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM likes ORDER BY created_at DESC",
    );

    const likes = result.rows;
    res.json(likes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get likes for a post and whether a user likes it
router.get("/post/:post_id", async (req, res) => {
  try {
    const user_id = req.user.id;
    const { post_id } = req.params;

    const countRes = await pool.query(
      "SELECT COUNT(*) FROM likes WHERE post_id = $1",
      [post_id],
    );

    const likedRes = await pool.query(
      "SELECT 1 FROM likes WHERE user_id = $1 AND post_id = $2",
      [user_id, post_id],
    );

    res.json({
      likeCount: parseInt(countRes.rows[0].count),
      liked: likedRes.rows.length > 0,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// Delete a like
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM likes WHERE like_id = $1", [
      id,
    ]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Like not found" });
    }
    res.json("Like was deleted");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
