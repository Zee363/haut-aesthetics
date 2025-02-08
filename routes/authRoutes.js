const express = require('express');
const path = require('path');
const { signup } = require('../Controllers/authControllers');

const router = express.Router();

router.post("/signup", signup);

module.exports = router;