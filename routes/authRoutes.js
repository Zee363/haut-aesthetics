const express = require('express');
const path = require('path');
const { signup } = require('../Controllers/authControllers');

const router = express.Router();

router.post("/api/auth/signup", signup);

router.post("/api/auth/login", (req, res) => {
    res.send("Login route");
});

module.exports = router;