require('dotenv').config();
const authRoutes = require('./src/routes/authRoutes.js');
const postRoutes = require('./src/routes/postRoutes.js')
const userRoutes = require('./src/routes/userRoutes.js')
const commentRoutes = require('./src/routes/commentRoutes.js')
const likeRoutes = require('./src/routes/likeRoutes.js')
const authMiddleware = require('./src/middleware/authMiddleware.js')

const express = require("express")
const app = express();
const cors = require("cors")


// middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT

// Routes
app.use('/auth', authRoutes)
app.use('/post', authMiddleware, postRoutes)
app.use('/user', authMiddleware, userRoutes)
app.use('/comment', authMiddleware, commentRoutes)
app.use('/like', authMiddleware, likeRoutes)


app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`)
})