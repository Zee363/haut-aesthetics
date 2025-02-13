const express = require('express');
const path = require('path');
const blogsControllers = require('../Controllers/blogsControllers');

const router = express.Router();

router.get("/api/lifestyle/:id", blogsControllers.getLifestylePostById);

router.get("/api/beauty:id", blogsControllers.getbeautyPostsById);

router.get("/api/fashion:id", blogsControllers.getfashionPostsById)

router.put("/api/beauty:id", blogsControllers.createPost);
module.exports = router;