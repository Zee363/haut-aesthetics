const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

const blogsControllers = require('../Controllers/blogsControllers');

const router = express.Router(); 

router.get("/api/lifestyle:id", blogsControllers.getlifestylePostsById);

router.get("/api/beauty:id", blogsControllers.getbeautyPostsById);

router.get("/api/fashion:id", blogsControllers.getfashionPostsById)

router.post("/api/newpost/", blogsControllers.createPost);

module.exports = router;