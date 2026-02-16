const express = require('express')
const router = express.Router()
const pool = require("../db")


// GET user
router.get('/:id', async(req, res) => {

    try {
        const {id} = req.params;
        const userRes = await pool.query("SELECT * FROM users WHERE user_id = $1", [id])
        res.json(userRes.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
})


// GET users
router.get('', async(req, res) => {
    try {
        const userRes = await pool.query("SELECT * FROM users")
        res.json(userRes.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
})





module.exports = router;