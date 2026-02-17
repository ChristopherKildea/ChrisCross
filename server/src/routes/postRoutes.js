const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET posts
router.get("", async (req, res) => {
  try {
    const userId = req.user.id;

    const postsRes = await pool.query(
      `
      SELECT 
        p.*,
        u.username,  -- add username from users table
        COALESCE(
          json_agg(DISTINCT jsonb_build_object(
            'comment_id', c.comment_id,
            'user_id', c.user_id,
            'content', c.content,
            'created_at', c.created_at
          )) FILTER (WHERE c.comment_id IS NOT NULL), '[]'
        ) AS comments,
        COUNT(DISTINCT l.like_id) AS like_count,
        EXISTS(
            SELECT 1 FROM likes l2 
            WHERE l2.post_id = p.post_id AND l2.user_id = $1
        ) AS has_liked,
        COUNT(DISTINCT c.comment_id) AS comment_count
      FROM posts p
      JOIN users u ON u.user_id = p.user_id   -- join to get username
      LEFT JOIN comments c ON c.post_id = p.post_id
      LEFT JOIN likes l ON l.post_id = p.post_id
      GROUP BY p.post_id, u.username
      ORDER BY p.created_at DESC;
    `,
      [userId],
    );

    res.json(postsRes.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET a post
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Get post with username using JOIN
    const postRes = await pool.query(
      `SELECT posts.*, users.username
       FROM posts
       JOIN users ON posts.user_id = users.user_id
       WHERE posts.post_id = $1`,
      [id],
    );

    const post = postRes.rows[0];

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Get comments
    const commentsRes = await pool.query(
      "SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at DESC",
      [id],
    );
    const comments = commentsRes.rows;

    // Get likes
    const likesRes = await pool.query(
      "SELECT * FROM likes WHERE post_id = $1",
      [id],
    );
    const likes = likesRes.rows;

    // Combine into one object
    res.json({ ...post, comments, likes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Make a post
router.post("", async (req, res) => {
  try {
    const { title, body } = req.body;

    const result = await pool.query(
      "INSERT INTO posts (user_id, title, body) VALUES ($1, $2, $3) RETURNING *",
      [req.user.id, title, body],
    );

    const newPost = result.rows[0];
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err.message);
  }
});

// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM posts WHERE post_id = $1", [
      id,
    ]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json("Post was deleted");
  } catch (err) {
    console.log(err.message);
  }
});

// TODO: Add in an edit post

module.exports = router;
