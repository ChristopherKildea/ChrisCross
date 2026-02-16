const express = require('express')
const router = express.Router()
const pool = require("../db")



// Make a like
router.post('', async (req, res) => {

    try {   
        const { post_id } = req.body;
        const user_id = req.user.id;

        const result = await pool.query(
        "INSERT INTO likes (user_id, post_id) VALUES ($1, $2) RETURNING *",
        [user_id, post_id]
        );

        if (result.rowCount === 0) {
        return res.status(200).json({
            message: "Post already liked"
        });
        }
        
        const newLike = result.rows[0];
        res.status(201).json(newLike)

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
})



// Get likes
router.get('', async(req, res) => {


    try {
        const result = await pool.query(
            "SELECT * FROM likes ORDER BY created_at DESC");

        const likes = result.rows; 
        res.json(likes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
})

// Get likes for a post
router.get('/post/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        console.log(postId)

        const result = await pool.query(
            `SELECT * 
             FROM likes
             WHERE post_id = $1
             ORDER BY created_at DESC`,
            [postId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});


// Delete a like
router.delete("/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const result = await pool.query("DELETE FROM likes WHERE like_id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Like not found" });
        }
        res.json("Like was deleted")
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
})



module.exports = router;