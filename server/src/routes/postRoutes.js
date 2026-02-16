const express = require('express')
const router = express.Router()
const pool = require("../db")


// GET posts
router.get('', async(req, res) => {

    try {
        const postsRes = await pool.query(
            "SELECT * FROM posts ORDER BY created_at DESC");

        const posts = postsRes.rows; 
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }

})

// GET a post
router.get("/:id", async(req, res) => {

    try {
        const {id} = req.params;
        const postRes = await pool.query("SELECT * FROM posts WHERE post_id = $1", [id]);

        res.json(postRes.rows[0])
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
})


// Make a post
router.post('', async (req, res) => {

    try {   
        const { title, body } = req.body;

        const result = await pool.query(
        "INSERT INTO posts (user_id, title, body) VALUES ($1, $2, $3) RETURNING *",
        [req.user.id, title, body]
        );

        const newPost = result.rows[0];
        res.status(201).json(newPost)

    } catch (err) {
        console.error(err.message)
    }

})


// Delete a post
router.delete("/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const result = await pool.query("DELETE FROM posts WHERE post_id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json("Post was deleted")
    } catch (err) {
        console.log(err.message)
    }
})



// TODO: Add in an edit post


module.exports = router;