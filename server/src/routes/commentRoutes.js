const express = require("express");
const router = express.Router();
const pool = require("../db");

// Make a comment
router.post("", async (req, res) => {
  try {
    const { post_id, content } = req.body;
    const user_id = req.user.id;

    const result = await pool.query(
      "INSERT INTO comments (user_id, post_id, content) VALUES ($1, $2, $3) RETURNING *",
      [user_id, post_id, content],
    );

    const newComment = result.rows[0];
    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get comments
router.get("", async (req, res) => {
  try {
    const commentsRes = await pool.query(
      "SELECT * FROM comments ORDER BY created_at DESC",
    );

    const comments = commentsRes.rows;
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Delete a comment
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM comments WHERE comment_id = $1",
      [id],
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json("Comment was deleted");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get comments for a post
router.get("/post/:postId", async (req, res) => {
  try {
    const { postId } = req.params;

    const result = await pool.query(
      `SELECT * 
             FROM comments
             WHERE post_id = $1
             ORDER BY created_at DESC`,
      [postId],
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
