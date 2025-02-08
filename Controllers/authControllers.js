const fs = require('fs-extra');
const path = require("path");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { error } = require('console');

const userDir = path.join( __dirname, "../data/user");

exports.signup = async (req, res) => {
    try {
        const{fullname, email, password} = req.body;

        await fs.ensureDir(userDir);

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: Date.now().toString(),
            fullname,
            email,
            password: hashedPassword
        };

        const userFile = path.join(userDir, `${newUser.id}.json`);
        await fs.writeJson(userFile, newUser);
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({message: "Error signing up user.", error: error.message })
    }
}